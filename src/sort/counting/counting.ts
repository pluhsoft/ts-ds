/**
 * Sorts an array of numbers using counting sort.
 * @param {number[]} array - Numbers to sort.
 * @returns {number[]} Sorted array.
 */
export function countingSort(array: number[]): number[] {
  if (array.length === 0) {
    return [];
  }

  const min = Math.min(...array);
  const max = Math.max(...array);
  const offset = -min;
  const count = new Array(max - min + 1).fill(0);

  for (const value of array) {
    count[value + offset] += 1;
  }

  const result: number[] = [];
  for (let value = min; value <= max; value += 1) {
    const frequency = count[value + offset];
    for (let i = 0; i < frequency; i += 1) {
      result.push(value);
    }
  }

  return result;
}
