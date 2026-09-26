import { CompareFn, defaultCompare } from '../utils';

/**
 * Sorts an array in place using insertion sort.
 *
 * Keeps the prefix `array[0..i-1]` sorted and inserts `array[i]` into it,
 * shifting greater elements one position to the right. Fast on small and
 * nearly sorted arrays.
 *
 * | Time: best | Time: average | Time: worst | Memory | Stable | In place |
 * | ---------- | ------------- | ----------- | ------ | ------ | -------- |
 * | O(n)       | O(n²)         | O(n²)       | O(1)   | yes    | yes      |
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {T[]} The same array, sorted.
 */
export function insertionSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  for (let i = 1; i < array.length; i += 1) {
    const key = array[i];
    let j = i - 1;
    while (j >= 0 && compareFn(array[j], key) > 0) {
      array[j + 1] = array[j];
      j -= 1;
    }
    array[j + 1] = key;
  }
  return array;
}
