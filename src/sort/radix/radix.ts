import { assertIntegers, minMax } from '../utils.js';

const BASE = 10;

/**
 * Sorts an array of integers in place using LSD radix sort (CLRS, chapter 8.3).
 *
 * Sorts by the last decimal digit, then by the one before it, and so on up to
 * the most significant digit of the largest value. Each pass is a stable
 * counting sort by one digit, so the order established by earlier (lower)
 * digits is kept for equal higher digits.
 *
 * Negative numbers are sorted by their absolute value separately and placed
 * before the non-negative ones in reverse order.
 *
 * With `d` digits in the largest absolute value and base `b = 10`:
 *
 * | Time: best   | Time: average | Time: worst  | Memory   | Stable | In place |
 * | ------------ | ------------- | ------------ | -------- | ------ | -------- |
 * | O(d(n + b))  | O(d(n + b))   | O(d(n + b))  | O(n + b) | yes    | no¹      |
 *
 * ¹ The result is written back into `array`, but O(n) extra memory is used.
 * @param {number[]} array - Integers to sort, negative values are allowed. It is modified.
 * @returns {void} Nothing — `array` itself is sorted in ascending order.
 * @throws {TypeError} If a value is not an integer.
 */
export function radixSort(array: number[]): void {
  assertIntegers(array, 'Radix sort');
  if (array.length < 2) {
    return;
  }

  const negatives: number[] = [];
  const nonNegatives: number[] = [];
  for (const value of array) {
    if (value < 0) {
      negatives.push(-value);
    } else {
      nonNegatives.push(value);
    }
  }

  sortNonNegative(negatives);
  sortNonNegative(nonNegatives);

  let k = 0;
  for (let i = negatives.length - 1; i >= 0; i -= 1) {
    array[k++] = -negatives[i];
  }
  for (const value of nonNegatives) {
    array[k++] = value;
  }
}

function sortNonNegative(values: number[]): void {
  if (values.length < 2) {
    return;
  }
  const { max } = minMax(values);
  const output = new Array<number>(values.length);

  for (let place = 1; Math.floor(max / place) > 0; place *= BASE) {
    countingSortByDigit(values, output, place);
  }
}

/** Stable counting sort of `values` by the digit at `place` (1, 10, 100, …). */
function countingSortByDigit(values: number[], output: number[], place: number): void {
  const digitOf = (value: number) => Math.floor(value / place) % BASE;
  const count = new Array<number>(BASE).fill(0);

  for (const value of values) {
    count[digitOf(value)] += 1;
  }
  for (let d = 1; d < BASE; d += 1) {
    count[d] += count[d - 1];
  }
  for (let i = values.length - 1; i >= 0; i -= 1) {
    const digit = digitOf(values[i]);
    count[digit] -= 1;
    output[count[digit]] = values[i];
  }
  for (let i = 0; i < values.length; i += 1) {
    values[i] = output[i];
  }
}
