/**
 * Sorts an array of integers using radix sort.
 * @param {number[]} array - Numbers to sort.
 * @returns {number[]} Sorted array.
 */
export function radixSort(array: number[]): number[] {
  if (array.length === 0) {
    return [];
  }

  const positive = array.filter((value) => value >= 0);
  const negative = array.filter((value) => value < 0).map((value) => -value);

  const sortedPositive = radixSortNonNegative(positive);
  const sortedNegative = radixSortNonNegative(negative).reverse().map((value) => -value);

  return sortedNegative.concat(sortedPositive);
}

function radixSortNonNegative(array: number[]): number[] {
  if (array.length === 0) {
    return [];
  }

  const maxValue = Math.max(...array);
  let place = 1;
  let result = array.slice();

  while (place <= maxValue) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    for (const value of result) {
      const digit = Math.floor((value / place) % 10);
      buckets[digit].push(value);
    }
    result = buckets.flat();
    place *= 10;
  }

  return result;
}
