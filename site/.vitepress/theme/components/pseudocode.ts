import type { Step } from 'ts-ds';

/**
 * Pseudocode of every sorting algorithm and the line each traced step belongs to.
 *
 * The library algorithms are not instrumented. Instead, `lines` replays the control flow of the
 * algorithm (loops, branches, recursion) driven by the recorded comparison results and consumes
 * the trace step by step — so the highlighted line is exact, and `pseudocode.test.ts` checks that
 * this control flow matches the real one on random inputs.
 */
export interface Pseudocode {
  code: string[];
  /** Line index (in `code`) for every step of a trace of an array of length `n`. */
  lines: (n: number, steps: readonly Step<unknown>[]) => number[];
}

class Cursor {
  readonly lines: number[] = [];
  private index = 0;

  constructor(private readonly steps: readonly Step<unknown>[]) {}

  compare(line: number): number {
    const step = this.next('compare', line);
    return step.type === 'compare' ? step.result : 0;
  }

  write(line: number): void {
    this.next('write', line);
  }

  /** `swap(a, i, j)` is recorded as one swap, or as two writes when `i === j`. */
  swap(i: number, j: number, line: number): void {
    if (i === j) {
      this.next('write', line);
      this.next('write', line);
    } else {
      this.next('swap', line);
    }
  }

  done(): number[] {
    if (this.index !== this.steps.length) {
      throw new Error(`pseudocode: ${this.steps.length - this.index} steps left unexplained`);
    }
    return this.lines;
  }

  private next(type: Step<unknown>['type'], line: number): Step<unknown> {
    const step = this.steps[this.index];
    if (step?.type !== type) {
      throw new Error(`pseudocode: expected ${type} at step ${this.index}, got ${step?.type}`);
    }
    this.index += 1;
    this.lines.push(line);
    return step;
  }
}

const bubble: Pseudocode = {
  code: [
    'for pass = 0 to n − 2',
    '  for i = 0 to n − pass − 2',
    '    if A[i] > A[i + 1]',
    '      swap A[i] and A[i + 1]',
    '  if no swaps in this pass: stop',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    for (let pass = 0; pass < n - 1; pass += 1) {
      let swapped = false;
      for (let i = 0; i < n - pass - 1; i += 1) {
        if (c.compare(2) > 0) {
          c.swap(i, i + 1, 3);
          swapped = true;
        }
      }
      if (!swapped) break;
    }
    return c.done();
  },
};

const selection: Pseudocode = {
  code: [
    'for i = 0 to n − 2',
    '  min = i',
    '  for j = i + 1 to n − 1',
    '    if A[j] < A[min]: min = j',
    '  if min ≠ i: swap A[i] and A[min]',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    for (let i = 0; i < n - 1; i += 1) {
      let min = i;
      for (let j = i + 1; j < n; j += 1) {
        if (c.compare(3) < 0) min = j;
      }
      if (min !== i) c.swap(i, min, 4);
    }
    return c.done();
  },
};

/** Insertion sort with step `gap` — shared by insertion sort (gap 1) and Shell sort. */
function gappedInsertion(c: Cursor, n: number, gap: number): void {
  for (let i = gap; i < n; i += 1) {
    let j = i;
    while (j >= gap) {
      if (c.compare(2) > 0) {
        c.write(3);
        j -= gap;
      } else {
        break;
      }
    }
    c.write(4);
  }
}

const insertion: Pseudocode = {
  code: [
    'for i = 1 to n − 1',
    '  key = A[i]',
    '  while j ≥ 0 and A[j] > key',
    '    A[j + 1] = A[j]        // shift right',
    '  A[j + 1] = key',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    gappedInsertion(c, n, 1);
    return c.done();
  },
};

const shell: Pseudocode = {
  code: [
    'for each gap h in …, 13, 4, 1',
    '  for i = h to n − 1',
    '    while j ≥ h and A[j − h] > key',
    '      A[j] = A[j − h]      // shift by h',
    '    A[j] = key',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    let gap = 1;
    while (gap < Math.floor(n / 3)) gap = 3 * gap + 1;
    for (; gap >= 1; gap = (gap - 1) / 3) gappedInsertion(c, n, gap);
    return c.done();
  },
};

const merge: Pseudocode = {
  code: [
    'MERGE-SORT(low, high): sort both halves',
    '  if A[mid] ≤ A[mid + 1]: already in order',
    '  MERGE: copy A[low..high] to buffer B',
    '    if B[j] < B[i]          // compare the fronts',
    '      A[k] = B[j]',
    '    else A[k] = B[i]',
    '    one half is used up: A[k] = the rest',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    const sort = (low: number, high: number): void => {
      if (low >= high) return;
      const mid = Math.floor((low + high) / 2);
      sort(low, mid);
      sort(mid + 1, high);
      if (c.compare(1) <= 0) return;
      let left = low;
      let right = mid + 1;
      for (let k = low; k <= high; k += 1) {
        if (left > mid) {
          c.write(6);
          right += 1;
        } else if (right > high) {
          c.write(6);
          left += 1;
        } else if (c.compare(3) < 0) {
          c.write(4);
          right += 1;
        } else {
          c.write(5);
          left += 1;
        }
      }
    };
    sort(0, n - 1);
    return c.done();
  },
};

const quick: Pseudocode = {
  code: [
    'QUICK-SORT(low, high): while low < high',
    '  pivot = median of A[low], A[mid], A[high]',
    '  repeat i = i + 1 while A[i] < pivot',
    '  repeat j = j − 1 while pivot < A[j]',
    '  if i < j: swap A[i] and A[j]',
    '  swap A[low] and A[j]      // pivot in place',
    '  recurse into the smaller part',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    const partition = (low: number, high: number): number => {
      const mid = Math.floor((low + high) / 2);
      if (c.compare(1) < 0) c.swap(mid, low, 1);
      if (c.compare(1) < 0) c.swap(high, low, 1);
      if (c.compare(1) < 0) c.swap(high, mid, 1);
      c.swap(low, mid, 1);
      let i = low;
      let j = high + 1;
      for (;;) {
        do i += 1;
        while (i < high && c.compare(2) < 0);
        do j -= 1;
        while (c.compare(3) < 0);
        if (i >= j) break;
        c.swap(i, j, 4);
      }
      c.swap(low, j, 5);
      return j;
    };
    const sort = (low: number, high: number): void => {
      while (low < high) {
        const p = partition(low, high);
        if (p - low < high - p) {
          sort(low, p - 1);
          low = p + 1;
        } else {
          sort(p + 1, high);
          high = p - 1;
        }
      }
    };
    sort(0, n - 1);
    return c.done();
  },
};

const heap: Pseudocode = {
  code: [
    'for i = ⌊n/2⌋ − 1 downto 0: SIFT-DOWN(i, n)',
    'for end = n − 1 downto 1',
    '  swap A[0] and A[end]      // maximum in place',
    '  SIFT-DOWN(0, end)',
    'SIFT-DOWN: compare A[i] with its children',
    '  swap A[i] and the larger child',
  ],
  lines(n, steps) {
    const c = new Cursor(steps);
    const siftDown = (root: number, size: number): void => {
      let parent = root;
      for (;;) {
        const left = 2 * parent + 1;
        const right = left + 1;
        let largest = parent;
        if (left < size && c.compare(4) > 0) largest = left;
        if (right < size && c.compare(4) > 0) largest = right;
        if (largest === parent) return;
        c.swap(parent, largest, 5);
        parent = largest;
      }
    };
    for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) siftDown(i, n);
    for (let end = n - 1; end > 0; end -= 1) {
      c.swap(0, end, 2);
      siftDown(0, end);
    }
    return c.done();
  },
};

/** Counting and radix sort work in auxiliary arrays: only the final copy reaches `A`. */
function writesOnly(code: string[], line: number): Pseudocode {
  return {
    code,
    lines(_n, steps) {
      const c = new Cursor(steps);
      for (let k = 0; k < steps.length; k += 1) c.write(line);
      return c.done();
    },
  };
}

const counting = writesOnly(
  [
    'count[v] = how many times v occurs',
    'count[v] = number of elements ≤ v   // prefix sums',
    'for i = n − 1 downto 0: B[--count[A[i]]] = A[i]',
    'copy B back to A',
  ],
  3,
);

const radix = writesOnly(
  [
    'split into negatives and non-negatives',
    'for each digit, from the least significant',
    '  stable counting sort by this digit',
    'write the sorted numbers back to A',
  ],
  3,
);

export const pseudocode: Record<string, Pseudocode> = {
  bubble,
  selection,
  insertion,
  shell,
  merge,
  quick,
  heap,
  counting,
  radix,
};
