/**
 * Comparison function for generic sorting algorithms.
 * @template T
 * @param {T} a - First value to compare.
 * @param {T} b - Second value to compare.
 * @returns {number} Negative if a < b, positive if a > b, zero if equal.
 */
export type CompareFn<T> = (a: T, b: T) => number;

/**
 * Default comparison function for primitive values.
 * @template T
 * @param {T} a - First value to compare.
 * @param {T} b - Second value to compare.
 * @returns {number} Comparison result.
 */
export function defaultCompare<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Swaps two elements in an array.
 * @template T
 * @param {T[]} array - The array that contains elements to swap.
 * @param {number} indexA - Index of the first element.
 * @param {number} indexB - Index of the second element.
 * @returns {void}
 */
export function swap<T>(array: T[], indexA: number, indexB: number): void {
  const temp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = temp;
}
