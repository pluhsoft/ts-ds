import { type CompareFn, defaultCompare, swap } from '../utils.js';

/**
 * Sorts an array in place using quick sort.
 *
 * Divide and conquer: picks a pivot, partitions the range so that elements
 * before the pivot are not greater and elements after it are not less, then
 * sorts both parts recursively.
 *
 * Details that make it reliable, as described by Hoare and Sedgewick:
 * - **Hoare partitioning** — two indexes move towards each other and swap
 *   elements that are on the wrong side. Both scans stop on elements equal to
 *   the pivot, so arrays with many duplicates are split evenly.
 * - **Median-of-three pivot** — the median of the first, middle and last element.
 *   Sorted and reversed arrays, the classic worst case for the "first/last
 *   element" pivot, become the best case.
 * - **Recursion into the smaller part only**, the larger part is handled by the
 *   loop — the call stack depth is at most O(log n) for any input.
 *
 * The worst case O(n²) is still possible on specially crafted input.
 * CLRS avoids it with high probability by choosing the pivot at random.
 *
 * | Time: best | Time: average | Time: worst | Memory   | Stable | In place |
 * | ---------- | ------------- | ----------- | -------- | ------ | -------- |
 * | O(n log n) | O(n log n)    | O(n²)       | O(log n) | no     | yes      |
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {void} Nothing — `array` itself is sorted.
 */
export function quickSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  sortRange(array, 0, array.length - 1, compareFn);
}

function sortRange<T>(array: T[], low: number, high: number, compareFn: CompareFn<T>): void {
  while (low < high) {
    const pivotIndex = partition(array, low, high, compareFn);

    if (pivotIndex - low < high - pivotIndex) {
      sortRange(array, low, pivotIndex - 1, compareFn);
      low = pivotIndex + 1;
    } else {
      sortRange(array, pivotIndex + 1, high, compareFn);
      high = pivotIndex - 1;
    }
  }
}

/**
 * Hoare partitioning of `array[low..high]` around a median-of-three pivot.
 * Afterwards `array[low..p-1] <= array[p] <= array[p+1..high]`.
 * @returns {number} `p` — the final index of the pivot.
 */
function partition<T>(array: T[], low: number, high: number, compareFn: CompareFn<T>): number {
  moveMedianOfThreeToStart(array, low, high, compareFn);
  const pivot = array[low];

  let i = low;
  let j = high + 1;
  while (true) {
    do {
      i += 1;
    } while (i < high && compareFn(array[i], pivot) < 0);
    do {
      j -= 1;
    } while (compareFn(pivot, array[j]) < 0);

    if (i >= j) {
      break;
    }
    swap(array, i, j);
  }
  swap(array, low, j);
  return j;
}

/** Puts the median of `array[low]`, `array[middle]`, `array[high]` at `array[low]`. */
function moveMedianOfThreeToStart<T>(
  array: T[],
  low: number,
  high: number,
  compareFn: CompareFn<T>,
): void {
  const middle = Math.floor((low + high) / 2);
  if (compareFn(array[middle], array[low]) < 0) {
    swap(array, middle, low);
  }
  if (compareFn(array[high], array[low]) < 0) {
    swap(array, high, low);
  }
  if (compareFn(array[high], array[middle]) < 0) {
    swap(array, high, middle);
  }
  // Now array[low] <= array[middle] <= array[high]
  swap(array, low, middle);
}
