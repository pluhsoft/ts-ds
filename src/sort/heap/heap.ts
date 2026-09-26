import { CompareFn, defaultCompare, swap } from '../utils';

/**
 * Sorts an array in place using heap sort.
 *
 * 1. Builds a max-heap from the array: `array[i] >= array[2i+1]` and
 *    `array[i] >= array[2i+2]`, so the largest element is at index 0.
 * 2. Moves the largest element to the end, shrinks the heap by one and
 *    restores the heap property with `siftDown`. Repeats until the heap is empty.
 *
 * | Time: best | Time: average | Time: worst | Memory | Stable | In place |
 * | ---------- | ------------- | ----------- | ------ | ------ | -------- |
 * | O(n log n) | O(n log n)    | O(n log n)  | O(1)   | no     | yes      |
 * @template T
 * @param {T[]} array - Array to sort. It is modified.
 * @param {CompareFn<T>} [compareFn] - Order of elements, ascending by default.
 * @returns {void} Nothing — `array` itself is sorted.
 */
export function heapSort<T>(array: T[], compareFn: CompareFn<T> = defaultCompare): void {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    siftDown(array, i, n, compareFn);
  }

  for (let end = n - 1; end > 0; end -= 1) {
    swap(array, 0, end);
    siftDown(array, 0, end, compareFn);
  }
}

/** Moves `array[root]` down until both children are not greater. The heap is `array[0..size-1]`. */
function siftDown<T>(array: T[], root: number, size: number, compareFn: CompareFn<T>): void {
  let parent = root;
  while (true) {
    const left = 2 * parent + 1;
    const right = left + 1;
    let largest = parent;

    if (left < size && compareFn(array[left], array[largest]) > 0) {
      largest = left;
    }
    if (right < size && compareFn(array[right], array[largest]) > 0) {
      largest = right;
    }
    if (largest === parent) {
      return;
    }
    swap(array, parent, largest);
    parent = largest;
  }
}
