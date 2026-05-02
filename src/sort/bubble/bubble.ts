import { CompareFn, defaultCompare, swap } from '../utils';

/**
 * Sorts an array in place using bubble sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {void}
 */
export function bubbleSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  const length = array.length;
  for (let pass = 0; pass < length - 1; pass++) {
    let swapped = false;
    for (let i = 0; i < length - pass - 1; i++) {
      if (compareFn(array[i], array[i + 1]) > 0) {
        swap(array, i, i + 1);
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
}
