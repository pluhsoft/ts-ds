/**
 * Sorts an array in place using shell sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {void}
 */
import { CompareFn, defaultCompare, swap } from '../utils';

export function shellSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  let gap = Math.floor(array.length / 2);

  while (gap > 0) {
    for (let i = gap; i < array.length; i += 1) {
      let j = i;
      const temp = array[i];

      while (j >= gap && compareFn(array[j - gap], temp) > 0) {
        array[j] = array[j - gap];
        j -= gap;
      }

      array[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
}
