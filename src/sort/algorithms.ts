import { bubbleSort } from './bubble/bubble.js';
import { countingSort } from './counting/counting.js';
import { heapSort } from './heap/heap.js';
import { insertionSort } from './insertion/insertion.js';
import { mergeSort } from './merge/merge.js';
import { quickSort } from './quick/quick.js';
import { radixSort } from './radix/radix.js';
import { selectionSort } from './selection/selection.js';
import { shellSort } from './shell/shell.js';
import type { CompareFn } from './utils.js';

/** Asymptotic complexity written in big-O notation, e.g. `"O(n log n)"`. */
export interface Complexity {
  /** Time on the most favourable input. */
  best: string;
  /** Expected time on random input. */
  average: string;
  /** Time on the least favourable input. */
  worst: string;
  /** Extra memory besides the input array. */
  memory: string;
}

interface AlgorithmInfo {
  /** Short identifier, the same as the key in the `sort` object. */
  id: string;
  /** English name, e.g. `"Quick sort"`. */
  name: string;
  /** Equal elements keep their original order. */
  stable: boolean;
  /** Needs only O(1) or O(log n) extra memory. */
  inPlace: boolean;
  complexity: Complexity;
}

/** A sorting algorithm that orders any values with a comparator. */
export interface ComparisonSortingAlgorithm extends AlgorithmInfo {
  kind: 'comparison';
  sort: <T>(array: T[], compareFn?: CompareFn<T>) => void;
}

/** A sorting algorithm that works with integers only and does not compare elements. */
export interface IntegerSortingAlgorithm extends AlgorithmInfo {
  kind: 'integer';
  sort: (array: number[]) => void;
}

/** Description of a sorting algorithm: its function and properties. */
export type SortingAlgorithm = ComparisonSortingAlgorithm | IntegerSortingAlgorithm;

/**
 * Every sorting algorithm of the library with its properties, from the simplest to the most
 * advanced. Useful for tables, comparisons and visualizations.
 *
 * The properties are verified by the test suite: stable algorithms are checked for stability,
 * comparison counts of quick sort are checked against O(n log n).
 * @example
 * for (const algorithm of sortingAlgorithms) {
 *   console.log(algorithm.name, algorithm.complexity.average, algorithm.stable);
 * }
 */
export const sortingAlgorithms: readonly SortingAlgorithm[] = [
  {
    id: 'bubble',
    name: 'Bubble sort',
    kind: 'comparison',
    sort: bubbleSort,
    stable: true,
    inPlace: true,
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', memory: 'O(1)' },
  },
  {
    id: 'selection',
    name: 'Selection sort',
    kind: 'comparison',
    sort: selectionSort,
    stable: false,
    inPlace: true,
    complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', memory: 'O(1)' },
  },
  {
    id: 'insertion',
    name: 'Insertion sort',
    kind: 'comparison',
    sort: insertionSort,
    stable: true,
    inPlace: true,
    complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', memory: 'O(1)' },
  },
  {
    id: 'shell',
    name: 'Shell sort',
    kind: 'comparison',
    sort: shellSort,
    stable: false,
    inPlace: true,
    complexity: { best: 'O(n log n)', average: 'O(n^1.25)', worst: 'O(n^1.5)', memory: 'O(1)' },
  },
  {
    id: 'merge',
    name: 'Merge sort',
    kind: 'comparison',
    sort: mergeSort,
    stable: true,
    inPlace: false,
    complexity: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)', memory: 'O(n)' },
  },
  {
    id: 'quick',
    name: 'Quick sort',
    kind: 'comparison',
    sort: quickSort,
    stable: false,
    inPlace: true,
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', memory: 'O(log n)' },
  },
  {
    id: 'heap',
    name: 'Heap sort',
    kind: 'comparison',
    sort: heapSort,
    stable: false,
    inPlace: true,
    complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', memory: 'O(1)' },
  },
  {
    id: 'counting',
    name: 'Counting sort',
    kind: 'integer',
    sort: countingSort,
    stable: true,
    inPlace: false,
    complexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)', memory: 'O(n + k)' },
  },
  {
    id: 'radix',
    name: 'Radix sort',
    kind: 'integer',
    sort: radixSort,
    stable: true,
    inPlace: false,
    complexity: {
      best: 'O(d(n + b))',
      average: 'O(d(n + b))',
      worst: 'O(d(n + b))',
      memory: 'O(n + b)',
    },
  },
];
