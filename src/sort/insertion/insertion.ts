import { CompareFn, defaultCompare } from '../utils';

/**
 * Sorts an array in place using insertion sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {void}
 */
export function insertionSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;

    while (j >= 0 && compareFn(array[j], current) > 0) {
      array[j + 1] = array[j];
      j -= 1;
    }

    array[j + 1] = current;
  }
}
