import { type CompareFn, defaultCompare } from '../sort/utils.js';

/** The algorithm compared two elements. */
export interface CompareStep<T> {
  type: 'compare';
  /** The compared values, in the order they were passed to the comparator. */
  values: [T, T];
  /**
   * Indexes of the compared values in the array, when they were read from it right before the
   * comparison. Empty when a value comes from somewhere else — a saved pivot or a buffer.
   */
  indices: number[];
  /** What the comparator returned: negative, zero or positive. */
  result: number;
}

/** The algorithm wrote a value into the array. */
export interface WriteStep<T> {
  type: 'write';
  index: number;
  value: T;
  /** The value that was at `index` before. */
  previous: T;
}

/** The algorithm exchanged two elements (two writes merged into one step). */
export interface SwapStep {
  type: 'swap';
  i: number;
  j: number;
}

/** One observable action of a sorting algorithm. */
export type Step<T> = CompareStep<T> | WriteStep<T> | SwapStep;

/** Counters of what the algorithm did. */
export interface TraceStats {
  /** Calls of the comparator. Always 0 for counting and radix sort. */
  comparisons: number;
  /** Reads of array elements. */
  reads: number;
  /** Writes of array elements, including the two writes of every swap. */
  writes: number;
  /** Exchanges of two elements. */
  swaps: number;
}

/** Everything that happened while an algorithm sorted an array. */
export interface Trace<T> {
  /** A copy of the array before sorting. */
  input: T[];
  /** The sorted array. */
  output: T[];
  /** Steps in the order they happened. Replay them on `input` to get `output`. */
  steps: Step<T>[];
  stats: TraceStats;
}

/** Any function that sorts an array in place, optionally with a comparator. */
export type SortFunction<T> = (array: T[], compareFn?: CompareFn<T>) => void;

/**
 * Records every comparison, read and write that a sorting algorithm makes, without changing the
 * algorithm itself: the array is wrapped in a `Proxy` and the comparator in a counting function.
 * The input array is not modified.
 *
 * Without `trace` the algorithms run with no overhead at all — tracing costs only when you use it.
 * @template T
 * @param {SortFunction<T>} algorithm - Sorting function, e.g. `quickSort` or `sort.merge`.
 * @param {T[]} input - Array to sort. It is copied, not modified.
 * @param {CompareFn<T>} [compareFn] - Comparator passed to the algorithm; its default order is
 *   used when omitted.
 * @returns {Trace<T>} The input, the sorted output, the steps and the counters.
 * @example
 * const { steps, stats } = trace(bubbleSort, [3, 1, 2]);
 * stats.comparisons; // 3
 * steps[1]; // { type: 'swap', i: 0, j: 1 }
 */
export function trace<T>(
  algorithm: SortFunction<T>,
  input: readonly T[],
  compareFn?: CompareFn<T>,
): Trace<T> {
  const array = [...input];
  const steps: Step<T>[] = [];
  const stats: TraceStats = { comparisons: 0, reads: 0, writes: 0, swaps: 0 };
  let recentReads: { index: number; value: T }[] = [];

  const observed = new Proxy(array, {
    get(target, key, receiver) {
      const index = toIndex(key);
      if (index !== undefined) {
        stats.reads += 1;
        recentReads.push({ index, value: target[index] });
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const index = toIndex(key);
      if (index !== undefined) {
        stats.writes += 1;
        recordWrite({ type: 'write', index, value, previous: target[index] });
      }
      return Reflect.set(target, key, value, receiver);
    },
  });

  // A swap `t = a[i]; a[i] = a[j]; a[j] = t` reads exactly i and j since the previous step, writes
  // i, then writes j without reading anything in between. Two writes that follow this pattern are
  // merged into one swap.
  let swapCandidate: { write: WriteStep<T>; partner: number } | undefined;

  function recordWrite(write: WriteStep<T>): void {
    const reads = recentReads.map((read) => read.index);
    recentReads = [];

    const first = swapCandidate;
    if (
      first &&
      reads.length === 0 &&
      write.index === first.partner &&
      steps[steps.length - 1] === first.write &&
      Object.is(write.value, first.write.previous)
    ) {
      steps[steps.length - 1] = { type: 'swap', i: first.write.index, j: write.index };
      stats.swaps += 1;
      swapCandidate = undefined;
      return;
    }

    steps.push(write);
    const [readI, readJ] = reads;
    swapCandidate =
      reads.length === 2 && readI === write.index && readJ !== readI
        ? { write, partner: readJ }
        : undefined;
  }

  const tracedCompare = (a: T, b: T): number => {
    const result = (compareFn ?? defaultCompare)(a, b);
    stats.comparisons += 1;
    steps.push({ type: 'compare', values: [a, b], indices: indicesOf(recentReads, a, b), result });
    recentReads = [];
    return result;
  };

  algorithm(observed, tracedCompare);
  return { input: [...input], output: array, steps, stats };
}

/**
 * Applies the steps to a copy of `input` and returns the array after the first `count` steps.
 * `replay(trace.input, trace.steps)` equals `trace.output`.
 * @template T
 * @param {readonly T[]} input - The array before sorting.
 * @param {readonly Step<T>[]} steps - Steps from {@link trace}.
 * @param {number} [count] - How many steps to apply, all by default.
 * @returns {T[]} The state of the array after these steps.
 */
export function replay<T>(
  input: readonly T[],
  steps: readonly Step<T>[],
  count = steps.length,
): T[] {
  const array = [...input];
  for (const step of steps.slice(0, count)) {
    if (step.type === 'write') {
      array[step.index] = step.value;
    } else if (step.type === 'swap') {
      [array[step.i], array[step.j]] = [array[step.j], array[step.i]];
    }
  }
  return array;
}

function toIndex(key: string | symbol): number | undefined {
  if (typeof key !== 'string') {
    return undefined;
  }
  const index = Number(key);
  return Number.isInteger(index) && index >= 0 && String(index) === key ? index : undefined;
}

/** Indexes of the most recent reads that returned `a` and `b`. */
function indicesOf<T>(reads: { index: number; value: T }[], a: T, b: T): number[] {
  const indices: number[] = [];
  for (const operand of [a, b]) {
    for (let i = reads.length - 1; i >= 0; i -= 1) {
      if (Object.is(reads[i].value, operand) && !indices.includes(reads[i].index)) {
        indices.push(reads[i].index);
        break;
      }
    }
  }
  return indices;
}
