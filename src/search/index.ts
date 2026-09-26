import {
  binarySearch,
  exponentialSearch,
  interpolationSearch,
  linearSearch,
  lowerBound,
  upperBound,
} from './search.js';

export {
  binarySearch,
  exponentialSearch,
  interpolationSearch,
  linearSearch,
  lowerBound,
  upperBound,
};

/** Description of a search algorithm. */
export interface SearchingAlgorithm {
  id: string;
  name: string;
  /** The array must be sorted in ascending order. */
  requiresSorted: boolean;
  /** Works with numbers only (uses arithmetic on the values). */
  numbersOnly: boolean;
  search: (array: readonly number[], target: number) => number;
  complexity: { best: string; average: string; worst: string; memory: string };
}

/** Every search algorithm of the library with its properties. */
export const searchingAlgorithms: readonly SearchingAlgorithm[] = [
  {
    id: 'linear',
    name: 'Linear search',
    requiresSorted: false,
    numbersOnly: false,
    search: linearSearch,
    complexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)', memory: 'O(1)' },
  },
  {
    id: 'binary',
    name: 'Binary search',
    requiresSorted: true,
    numbersOnly: false,
    search: binarySearch,
    complexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', memory: 'O(1)' },
  },
  {
    id: 'exponential',
    name: 'Exponential search',
    requiresSorted: true,
    numbersOnly: false,
    search: exponentialSearch,
    complexity: { best: 'O(1)', average: 'O(log i)', worst: 'O(log i)', memory: 'O(1)' },
  },
  {
    id: 'interpolation',
    name: 'Interpolation search',
    requiresSorted: true,
    numbersOnly: true,
    search: interpolationSearch,
    complexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)', memory: 'O(1)' },
  },
];

/** All search functions under short names: `search.binary(array, target)`. */
export const search = {
  linear: linearSearch,
  binary: binarySearch,
  exponential: exponentialSearch,
  interpolation: interpolationSearch,
  lowerBound,
  upperBound,
};
