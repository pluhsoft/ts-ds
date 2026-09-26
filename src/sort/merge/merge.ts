import { CompareFn, defaultCompare } from '../utils';

/**
 * Sorts an array in place using top-down merge sort.
 *
 * Divide and conquer: splits the range in two halves, sorts each half
 * recursively and merges the two sorted halves. Merging copies the range into
 * a buffer and writes the elements back in order, always taking from the left
 * half on ties — this keeps the sort stable.
 *
 * If the halves are already in order (`left.last <= right.first`) the merge is
 * skipped, so an already sorted array takes O(n).
 *
 * | Time: best | Time: average | Time: worst | Memory | Stable | In place |
 * | ---------- | ------------- | ----------- | ------ | ------ | -------- |
 * | O(n)       | O(n log n)    | O(n log n)  | O(n)   | yes    | no¹      |
 *
 * ¹ The result is written back into `array`, but an O(n) buffer is used.
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {T[]} The same array, sorted.
 */
export function mergeSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  const buffer = array.slice();
  sortRange(array, buffer, 0, array.length - 1, compareFn);
  return array;
}

function sortRange<T>(
  array: T[],
  buffer: T[],
  low: number,
  high: number,
  compareFn: CompareFn<T>,
): void {
  if (low >= high) {
    return;
  }
  const middle = Math.floor((low + high) / 2);
  sortRange(array, buffer, low, middle, compareFn);
  sortRange(array, buffer, middle + 1, high, compareFn);
  if (compareFn(array[middle], array[middle + 1]) <= 0) {
    return;
  }
  merge(array, buffer, low, middle, high, compareFn);
}

/** Merges the sorted ranges `array[low..middle]` and `array[middle+1..high]`. */
function merge<T>(
  array: T[],
  buffer: T[],
  low: number,
  middle: number,
  high: number,
  compareFn: CompareFn<T>,
): void {
  for (let k = low; k <= high; k += 1) {
    buffer[k] = array[k];
  }

  let left = low;
  let right = middle + 1;
  for (let k = low; k <= high; k += 1) {
    if (left > middle) {
      array[k] = buffer[right++];
    } else if (right > high) {
      array[k] = buffer[left++];
    } else if (compareFn(buffer[right], buffer[left]) < 0) {
      array[k] = buffer[right++];
    } else {
      array[k] = buffer[left++];
    }
  }
}
