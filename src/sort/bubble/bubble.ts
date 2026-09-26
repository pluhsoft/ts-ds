import { type CompareFn, defaultCompare, swap } from '../utils.js';

/**
 * Sorts an array in place using bubble sort.
 *
 * Repeatedly walks through the array and swaps adjacent elements that are in the
 * wrong order. After pass `k` the `k` largest elements are in their final places.
 * Stops early when a pass makes no swaps.
 *
 * | Time: best | Time: average | Time: worst | Memory | Stable | In place |
 * | ---------- | ------------- | ----------- | ------ | ------ | -------- |
 * | O(n)       | O(n²)         | O(n²)       | O(1)   | yes    | yes      |
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {void} Nothing — `array` itself is sorted.
 */
export function bubbleSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  for (let pass = 0; pass < array.length - 1; pass += 1) {
    let swapped = false;
    for (let i = 0; i < array.length - pass - 1; i += 1) {
      if (compareFn(array[i], array[i + 1]) > 0) {
        swap(array, i, i + 1);
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
}
