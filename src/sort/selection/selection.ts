import { CompareFn, defaultCompare, swap } from '../utils';

/**
 * Sorts an array in place using selection sort.
 *
 * On step `i` finds the smallest element of the unsorted part `array[i..n-1]`
 * and swaps it with `array[i]`. Makes at most `n - 1` swaps — useful when
 * writing to memory is expensive.
 *
 * | Time: best | Time: average | Time: worst | Memory | Stable | In place |
 * | ---------- | ------------- | ----------- | ------ | ------ | -------- |
 * | O(n²)      | O(n²)         | O(n²)       | O(1)   | no     | yes      |
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {T[]} The same array, sorted.
 */
export function selectionSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  for (let i = 0; i < array.length - 1; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j += 1) {
      if (compareFn(array[j], array[minIndex]) < 0) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(array, i, minIndex);
    }
  }
  return array;
}
