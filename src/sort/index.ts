import { bubbleSort } from './bubble/bubble.js';
import { countingSort } from './counting/counting.js';
import { heapSort } from './heap/heap.js';
import { insertionSort } from './insertion/insertion.js';
import { mergeSort } from './merge/merge.js';
import { quickSort } from './quick/quick.js';
import { radixSort } from './radix/radix.js';
import { selectionSort } from './selection/selection.js';
import { shellSort } from './shell/shell.js';

export {
  bubbleSort,
  countingSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  selectionSort,
  shellSort,
};
export { COUNTING_SORT_MAX_RANGE } from './counting/counting.js';
export { defaultCompare } from './utils.js';
export type { CompareFn } from './utils.js';

/** All sorting algorithms under short names: `sort.quick(array)`. */
export const sort = {
  bubble: bubbleSort,
  counting: countingSort,
  heap: heapSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  radix: radixSort,
  selection: selectionSort,
  shell: shellSort,
};
