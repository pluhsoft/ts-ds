import { type CompareFn, defaultCompare } from '../sort/utils.js';

/** A search step: the algorithm looked at an element, or compared it with the target. */
export type SearchStep<T> =
  { type: 'probe'; index: number; value: T } | { type: 'compare'; values: [T, T]; result: number };

/** Everything that happened during a search. */
export interface SearchTrace<T> {
  /** What the search function returned. */
  result: number;
  steps: SearchStep<T>[];
  stats: { probes: number; comparisons: number };
}

/**
 * Records which elements a search algorithm looks at (`probe`) and every call of the comparator
 * (`compare`). Like {@link trace}, the algorithm is not changed: the array is wrapped in a `Proxy`.
 * @template T
 * @param {(array: readonly T[], target: T, compareFn?: CompareFn<T>) => number} algorithm - Search
 *   function, e.g. `binarySearch`.
 * @param {readonly T[]} array - Array to search.
 * @param {T} target - Value to find.
 * @param {CompareFn<T>} [compareFn] - Comparator passed to the algorithm.
 * @returns {SearchTrace<T>} The result, the steps and the counters.
 * @example
 * traceSearch(binarySearch, [1, 3, 5, 7], 5).stats; // { probes: 3, comparisons: 3 }
 */
export function traceSearch<T>(
  algorithm: (array: readonly T[], target: T, compareFn?: CompareFn<T>) => number,
  array: readonly T[],
  target: T,
  compareFn?: CompareFn<T>,
): SearchTrace<T> {
  const steps: SearchStep<T>[] = [];
  const stats = { probes: 0, comparisons: 0 };
  const observed = new Proxy([...array], {
    get(target, key, receiver) {
      if (typeof key === 'string' && /^(0|[1-9]\d*)$/.test(key) && Number(key) < target.length) {
        stats.probes += 1;
        steps.push({ type: 'probe', index: Number(key), value: target[Number(key)] });
      }
      return Reflect.get(target, key, receiver);
    },
  });
  const tracedCompare = (a: T, b: T): number => {
    const result = (compareFn ?? defaultCompare)(a, b);
    stats.comparisons += 1;
    steps.push({ type: 'compare', values: [a, b], result });
    return result;
  };
  const result = algorithm(observed, target, tracedCompare);
  return { result, steps, stats };
}
