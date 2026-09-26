import { bubbleSort } from './bubble/bubble';
import { countingSort } from './counting/counting';
import { heapSort } from './heap/heap';
import { insertionSort } from './insertion/insertion';
import { mergeSort } from './merge/merge';
import { quickSort } from './quick/quick';
import { radixSort } from './radix/radix';
import { selectionSort } from './selection/selection';
import { shellSort } from './shell/shell';

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
export { COUNTING_SORT_MAX_RANGE } from './counting/counting';
export { defaultCompare } from './utils';
export type { CompareFn } from './utils';

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
