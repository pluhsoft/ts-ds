import { CompareFn, defaultCompare, swap } from '../utils';

/**
 * Sorts an array in place using quick sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {T[]} Sorted array (same reference).
 */
export function quickSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  quickSortRange(array, 0, array.length - 1, compareFn);
  return array;
}

function quickSortRange<T>(array: T[], left: number, right: number, compareFn: CompareFn<T>): void {
  if (left >= right) {
    return;
  }

  const pivotIndex = partition(array, left, right, compareFn);
  quickSortRange(array, left, pivotIndex - 1, compareFn);
  quickSortRange(array, pivotIndex + 1, right, compareFn);
}

function partition<T>(array: T[], left: number, right: number, compareFn: CompareFn<T>): number {
  const pivot = array[right];
  let i = left;

  for (let j = left; j < right; j += 1) {
    if (compareFn(array[j], pivot) <= 0) {
      swap(array, i, j);
      i += 1;
    }
  }

  swap(array, i, right);
  return i;
}
