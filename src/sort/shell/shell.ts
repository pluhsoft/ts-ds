import { CompareFn, defaultCompare } from '../utils';

/**
 * Sorts an array in place using Shell sort.
 *
 * Insertion sort over elements that are `gap` positions apart, with the gap
 * decreasing to 1. After a pass with gap `h` the array is "h-sorted", so the
 * final pass with gap 1 (plain insertion sort) has little left to do.
 *
 * Uses Knuth's gap sequence 1, 4, 13, 40, 121, … (`h = 3h + 1`), for which the
 * worst case O(n^(3/2)) is proven. Shell's original sequence n/2, n/4, … is
 * simpler but degrades to O(n²).
 *
 * | Time: best | Time: average    | Time: worst | Memory | Stable | In place |
 * | ---------- | ---------------- | ----------- | ------ | ------ | -------- |
 * | O(n log n) | ≈ O(n^(5/4))     | O(n^(3/2))  | O(1)   | no     | yes      |
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {void} Nothing — `array` itself is sorted.
 */
export function shellSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  let gap = 1;
  while (gap < Math.floor(array.length / 3)) {
    gap = 3 * gap + 1;
  }

  for (; gap >= 1; gap = (gap - 1) / 3) {
    for (let i = gap; i < array.length; i += 1) {
      const key = array[i];
      let j = i;
      while (j >= gap && compareFn(array[j - gap], key) > 0) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = key;
    }
  }
}
