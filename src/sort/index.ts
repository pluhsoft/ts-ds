export { selectionSort } from './selection/selection';
export { bubbleSort } from './bubble/bubble';
export { insertionSort } from './insertion/insertion';
export { mergeSort } from './merge/merge';
export { quickSort } from './quick/quick';
export { heapSort } from './heap/heap';
export { countingSort } from './counting/counting';
export { radixSort } from './radix/radix';
export { shellSort } from './shell/shell';

import { selectionSort } from './selection/selection';
import { bubbleSort } from './bubble/bubble';
import { insertionSort } from './insertion/insertion';
import { mergeSort } from './merge/merge';
import { quickSort } from './quick/quick';
import { heapSort } from './heap/heap';
import { countingSort } from './counting/counting';
import { radixSort } from './radix/radix';
import { shellSort } from './shell/shell';

export const sort = {
  selection: selectionSort,
  bubble: bubbleSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
  counting: countingSort,
  radix: radixSort,
  shell: shellSort,
};
