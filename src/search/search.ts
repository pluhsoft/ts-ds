import { type CompareFn, defaultCompare } from '../sort/utils.js';

/**
 * Finds the first element equal to `target` by checking every element from the left.
 *
 * Works on any array, sorted or not.
 *
 * | Time: best | Time: average | Time: worst | Memory |
 * | ---------- | ------------- | ----------- | ------ |
 * | O(1)       | O(n)          | O(n)        | O(1)   |
 * @template T
 * @param {readonly T[]} array - Array to search.
 * @param {T} target - Value to find.
 * @param {CompareFn<T>} [compareFn] - Returns 0 for equal values.
 * @returns {number} Index of the first equal element, or -1.
 */
export function linearSearch<T>(
  array: readonly T[],
  target: T,
  compareFn: CompareFn<T> = defaultCompare,
): number {
  for (let i = 0; i < array.length; i += 1) {
    if (compareFn(array[i], target) === 0) return i;
  }
  return -1;
}

/**
 * Index of the first element that is not less than `target` in a sorted array — the position
 * where `target` can be inserted keeping the order. Binary search: halves the range each step.
 *
 * | Time       | Memory |
 * | ---------- | ------ |
 * | O(log n)   | O(1)   |
 * @template T
 * @param {readonly T[]} array - Array sorted in the order of `compareFn`.
 * @param {T} target - Value to look for.
 * @param {CompareFn<T>} [compareFn] - Order of the array.
 * @returns {number} From 0 to `array.length`.
 */
export function lowerBound<T>(
  array: readonly T[],
  target: T,
  compareFn: CompareFn<T> = defaultCompare,
): number {
  return bound(array, target, compareFn, 0, array.length, false);
}

/**
 * Index of the first element that is greater than `target` in a sorted array.
 * `upperBound − lowerBound` is the number of elements equal to `target`.
 * @template T
 * @param {readonly T[]} array - Array sorted in the order of `compareFn`.
 * @param {T} target - Value to look for.
 * @param {CompareFn<T>} [compareFn] - Order of the array.
 * @returns {number} From 0 to `array.length`.
 */
export function upperBound<T>(
  array: readonly T[],
  target: T,
  compareFn: CompareFn<T> = defaultCompare,
): number {
  return bound(array, target, compareFn, 0, array.length, true);
}

/**
 * Finds the first element equal to `target` in a sorted array with binary search: compare with
 * the middle element and continue in the half that can contain `target`.
 *
 * | Time: best | Time: average | Time: worst | Memory |
 * | ---------- | ------------- | ----------- | ------ |
 * | O(log n)   | O(log n)      | O(log n)    | O(1)   |
 * @template T
 * @param {readonly T[]} array - Array sorted in the order of `compareFn`.
 * @param {T} target - Value to find.
 * @param {CompareFn<T>} [compareFn] - Order of the array.
 * @returns {number} Index of the first equal element, or -1.
 */
export function binarySearch<T>(
  array: readonly T[],
  target: T,
  compareFn: CompareFn<T> = defaultCompare,
): number {
  return found(array, target, compareFn, lowerBound(array, target, compareFn));
}

/**
 * Finds the first element equal to `target` in a sorted array: doubles an index (1, 2, 4, …)
 * until it passes `target`, then runs binary search in the last range. Fast when `target` is
 * near the beginning and for arrays of unknown length.
 *
 * | Time: best | Time: average | Time: worst | Memory |
 * | ---------- | ------------- | ----------- | ------ |
 * | O(1)       | O(log i)      | O(log i)    | O(1)   |
 *
 * `i` is the position of `target`.
 * @template T
 * @param {readonly T[]} array - Array sorted in the order of `compareFn`.
 * @param {T} target - Value to find.
 * @param {CompareFn<T>} [compareFn] - Order of the array.
 * @returns {number} Index of the first equal element, or -1.
 */
export function exponentialSearch<T>(
  array: readonly T[],
  target: T,
  compareFn: CompareFn<T> = defaultCompare,
): number {
  let end = 1;
  while (end < array.length && compareFn(array[end], target) < 0) end *= 2;
  const index = bound(array, target, compareFn, end >> 1, Math.min(end + 1, array.length), false);
  return found(array, target, compareFn, index);
}

/**
 * Finds the first element equal to `target` in a sorted array of numbers by estimating its
 * position from the values, like looking up a word in a dictionary:
 * `pos = low + (target − A[low]) · (high − low) / (A[high] − A[low])`.
 *
 * | Time: best | Time: average¹   | Time: worst | Memory |
 * | ---------- | ---------------- | ----------- | ------ |
 * | O(1)       | O(log log n)     | O(n)        | O(1)   |
 *
 * ¹ For uniformly distributed values. On skewed data (e.g. 1, 2, 3, …, 1 000 000) it degrades.
 * @param {readonly number[]} array - Numbers sorted in ascending order.
 * @param {number} target - Number to find.
 * @returns {number} Index of the first equal element, or -1.
 */
export function interpolationSearch(array: readonly number[], target: number): number {
  let low = 0;
  let high = array.length - 1;
  while (low <= high && target >= array[low] && target <= array[high]) {
    const span = array[high] - array[low];
    const pos = span === 0 ? low : low + Math.floor(((target - array[low]) * (high - low)) / span);
    if (array[pos] === target) {
      let first = pos;
      while (first > low && array[first - 1] === target) first -= 1;
      return first;
    }
    if (array[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}

/** Binary search for the first index in [low, high) where A[i] ≥ target (or > target). */
function bound<T>(
  array: readonly T[],
  target: T,
  compareFn: CompareFn<T>,
  low: number,
  high: number,
  upper: boolean,
): number {
  while (low < high) {
    const mid = (low + high) >>> 1;
    const order = compareFn(array[mid], target);
    if (order < 0 || (upper && order === 0)) low = mid + 1;
    else high = mid;
  }
  return low;
}

function found<T>(array: readonly T[], target: T, compareFn: CompareFn<T>, index: number): number {
  return index < array.length && compareFn(array[index], target) === 0 ? index : -1;
}
