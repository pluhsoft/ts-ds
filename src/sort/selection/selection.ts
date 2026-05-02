import { CompareFn, defaultCompare, swap } from '../utils';

/**
 * Sorts an array in place using selection sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {void}
 */
export function selectionSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  for (let current = 0; current < array.length - 1; current += 1) {
    let minimumIndex = current;

    for (let next = current + 1; next < array.length; next += 1) {
      if (compareFn(array[next], array[minimumIndex]) < 0) {
        minimumIndex = next;
      }
    }

    if (minimumIndex !== current) {
      swap(array, current, minimumIndex);
    }
  }
}
