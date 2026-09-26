/**
 * Sorts an array in place using heap sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {void}
 */
import { CompareFn, defaultCompare, swap } from '../utils';

/**
 * Sorts an array in place using heap sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {void}
 */
export function heapSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  const length = array.length;

  for (let start = Math.floor((length - 2) / 2); start >= 0; start -= 1) {
    siftDown(array, start, length - 1, compareFn);
  }

  for (let end = length - 1; end > 0; end -= 1) {
    swap(array, 0, end);
    siftDown(array, 0, end - 1, compareFn);
  }
}

function siftDown<T>(array: T[], start: number, end: number, compareFn: CompareFn<T>): void {
  let root = start;

  while (root * 2 + 1 <= end) {
    let child = root * 2 + 1;
    let swapIndex = root;

    if (compareFn(array[swapIndex], array[child]) < 0) {
      swapIndex = child;
    }
    if (child + 1 <= end && compareFn(array[swapIndex], array[child + 1]) < 0) {
      swapIndex = child + 1;
    }
    if (swapIndex === root) {
      return;
    }
    swap(array, root, swapIndex);
    root = swapIndex;
  }
}
