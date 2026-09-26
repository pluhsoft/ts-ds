import { assertIntegers, minMax } from '../utils';

/**
 * Largest supported range `max - min + 1`: 2²⁶ counters take 256 MB.
 * For wider ranges use {@link radixSort}.
 */
export const COUNTING_SORT_MAX_RANGE = 2 ** 26;

/**
 * Sorts an array of integers in place using counting sort (CLRS, chapter 8.2).
 *
 * Not a comparison sort, so it is not bound by the Ω(n log n) lower bound.
 * With `k = max - min + 1`:
 * 1. `count[v]` — how many times each value `v` occurs;
 * 2. prefix sums turn counts into positions: `count[v]` — how many values are `<= v`;
 * 3. walking the input from the end, every value is placed at `--count[v]`,
 *    which keeps equal values in their original order (the sort is stable).
 *
 * Efficient when `k` is not much larger than `n`.
 *
 * | Time: best | Time: average | Time: worst | Memory   | Stable | In place |
 * | ---------- | ------------- | ----------- | -------- | ------ | -------- |
 * | O(n + k)   | O(n + k)      | O(n + k)    | O(n + k) | yes    | no¹      |
 *
 * ¹ The result is written back into `array`, but O(n + k) extra memory is used.
 * @param {number[]} array - Integers to sort, negative values are allowed. It is modified.
 * @returns {void} Nothing — `array` itself is sorted in ascending order.
 * @throws {TypeError} If a value is not an integer.
 * @throws {RangeError} If `max - min + 1` exceeds {@link COUNTING_SORT_MAX_RANGE}.
 */
export function countingSort(array: number[]): void {
  assertIntegers(array, 'Counting sort');
  if (array.length < 2) {
    return;
  }

  const { min, max } = minMax(array);
  const range = max - min + 1;
  if (range > COUNTING_SORT_MAX_RANGE) {
    throw new RangeError(
      `Counting sort needs ${range} counters (max - min + 1), the limit is ${COUNTING_SORT_MAX_RANGE}. Use radix sort.`,
    );
  }

  const count = new Uint32Array(range);
  for (const value of array) {
    count[value - min] += 1;
  }
  for (let v = 1; v < range; v += 1) {
    count[v] += count[v - 1];
  }

  const output = new Array<number>(array.length);
  for (let i = array.length - 1; i >= 0; i -= 1) {
    const value = array[i];
    count[value - min] -= 1;
    output[count[value - min]] = value;
  }

  for (let i = 0; i < array.length; i += 1) {
    array[i] = output[i];
  }
}
