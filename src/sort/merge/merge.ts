import { CompareFn, defaultCompare } from '../utils';

/**
 * Returns a new array sorted with merge sort.
 * @template T
 * @param {T[]} array - Array to sort.
 * @param {CompareFn<T>} [compareFn] - Optional comparison function.
 * @returns {T[]} Sorted array.
 */
export function mergeSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): T[] {
  if (array.length <= 1) {
    return array.slice();
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), compareFn);
  const right = mergeSort(array.slice(mid), compareFn);

  return merge(left, right, compareFn);
}

function merge<T>(left: T[], right: T[], compareFn: CompareFn<T>): T[] {
  const result: T[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
