/**
 * Comparison function used by comparison sorts.
 *
 * Must define a consistent order (a strict weak ordering), exactly like the
 * comparator of `Array.prototype.sort`.
 * @template T
 * @param {T} a - First value to compare.
 * @param {T} b - Second value to compare.
 * @returns {number} Negative if `a` goes before `b`, positive if after, zero if equal.
 */
export type CompareFn<T> = (a: T, b: T) => number;

/**
 * Default ascending order for numbers, strings and other values comparable with `<`.
 *
 * - Strings are compared by UTF-16 code units: `'B' < 'a'`. Use
 *   `(a, b) => a.localeCompare(b)` for alphabetical order.
 * - `NaN` has no place in the numeric order, so it is treated as greater than
 *   any other value and ends up at the end of the array.
 * @template T
 * @param {T} a - First value to compare.
 * @param {T} b - Second value to compare.
 * @returns {number} `-1`, `0` or `1`.
 */
export function defaultCompare<T>(a: T, b: T): number {
  const aIsNaN = a !== a;
  const bIsNaN = b !== b;
  if (aIsNaN || bIsNaN) {
    return Number(aIsNaN) - Number(bIsNaN);
  }
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

/**
 * Swaps two elements of an array.
 * @template T
 * @param {T[]} array - The array that contains the elements.
 * @param {number} i - Index of the first element.
 * @param {number} j - Index of the second element.
 * @returns {void}
 */
export function swap<T>(array: T[], i: number, j: number): void {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

/**
 * Checks that every value is a safe integer — the domain of counting sort and radix sort.
 * @param {number[]} array - Values to check.
 * @param {string} algorithm - Algorithm name for the error message.
 * @throws {TypeError} If a value is not an integer (for example `1.5`, `NaN` or `Infinity`).
 * @returns {void}
 */
export function assertIntegers(array: number[], algorithm: string): void {
  for (const value of array) {
    if (!Number.isSafeInteger(value)) {
      throw new TypeError(`${algorithm} sorts integers only, got ${value}`);
    }
  }
}

/**
 * Finds the smallest and the largest value in one pass.
 *
 * Unlike `Math.min(...array)` it works for arrays of any length.
 * @param {number[]} array - Non-empty array of numbers.
 * @returns {{ min: number, max: number }} The smallest and the largest value.
 */
export function minMax(array: number[]): { min: number; max: number } {
  let min = array[0];
  let max = array[0];
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] < min) {
      min = array[i];
    } else if (array[i] > max) {
      max = array[i];
    }
  }
  return { min, max };
}
