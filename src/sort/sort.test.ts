import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import * as library from '../index';
import {
  bubbleSort,
  CompareFn,
  countingSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  selectionSort,
  shellSort,
  sort,
} from './index';

type ComparisonSort = <T>(array: T[], compareFn?: CompareFn<T>) => void;

/** Sorts a copy of `input` in place with `fn` and returns the copy. */
function sorted<T>(
  fn: (array: T[], compareFn?: CompareFn<T>) => void,
  input: T[],
  compareFn?: CompareFn<T>,
): T[] {
  const array = [...input];
  fn(array, compareFn);
  return array;
}

const comparisonSorts: { name: string; fn: ComparisonSort; stable: boolean; fast: boolean }[] = [
  { name: 'bubble', fn: bubbleSort, stable: true, fast: false },
  { name: 'selection', fn: selectionSort, stable: false, fast: false },
  { name: 'insertion', fn: insertionSort, stable: true, fast: false },
  { name: 'shell', fn: shellSort, stable: false, fast: true },
  { name: 'merge', fn: mergeSort, stable: true, fast: true },
  { name: 'quick', fn: quickSort, stable: false, fast: true },
  { name: 'heap', fn: heapSort, stable: false, fast: true },
];

const integerSorts = [
  { name: 'counting', fn: countingSort },
  { name: 'radix', fn: radixSort },
];

const allSorts = [...comparisonSorts, ...integerSorts];

const numberCompare = (a: number, b: number) => a - b;
const expected = (array: number[]) => [...array].sort(numberCompare);
const range = (n: number) => Array.from({ length: n }, (_, i) => i);

const cases: Record<string, number[]> = {
  empty: [],
  'one element': [7],
  'two elements': [2, 1],
  sorted: [1, 2, 3, 4, 5, 6],
  reversed: [6, 5, 4, 3, 2, 1],
  'all equal': [3, 3, 3, 3],
  duplicates: [4, 1, 3, 1, 4, 2, 3, 1],
  negatives: [0, -5, 3, -1, -5, 2, -100],
  'organ pipe': [1, 3, 5, 7, 6, 4, 2],
  'large values': [802, 2, 170, 45, 75, 90, 24, 66, 1_000_000, 0],
};

describe.each(allSorts)('$name sort', ({ fn }) => {
  it.each(Object.entries(cases))('sorts %s', (_, input) => {
    expect(sorted<number>(fn, input)).toEqual(expected(input));
  });

  it('sorts in place and returns nothing (command–query separation)', () => {
    const array = [3, 1, 2];
    expect(fn(array)).toBeUndefined();
    expect(array).toEqual([1, 2, 3]);
  });

  it('matches Array.prototype.sort on any integer array', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: -1000, max: 1000 }), { maxLength: 200 }), (input) => {
        expect(sorted<number>(fn, input)).toEqual(expected(input));
      }),
    );
  });
});

describe.each(comparisonSorts)('$name sort (comparison)', ({ fn, stable, fast }) => {
  it('uses the comparator for descending order', () => {
    expect(sorted(fn, [1, 3, 2], (a, b) => b - a)).toEqual([3, 2, 1]);
  });

  it('sorts strings by code units by default', () => {
    expect(sorted(fn, ['b', 'a', 'B', 'c'])).toEqual(['B', 'a', 'b', 'c']);
  });

  it('puts NaN at the end by default', () => {
    expect(sorted(fn, [3, NaN, 1, NaN, 2])).toEqual([1, 2, 3, NaN, NaN]);
  });

  it('sorts objects by a key', () => {
    const people = [{ age: 30 }, { age: 20 }, { age: 25 }];
    expect(sorted(fn, people, (a, b) => a.age - b.age).map((p) => p.age)).toEqual([20, 25, 30]);
  });

  it('matches Array.prototype.sort on any doubles', () => {
    fc.assert(
      fc.property(fc.array(fc.double({ noNaN: true }), { maxLength: 100 }), (input) => {
        // -0 and 0 are equal for the comparator, so an unstable sort may swap them:
        // compare values, not the positions of -0 and 0.
        const withoutNegativeZero = (array: number[]) => array.map((x) => x + 0);
        expect(withoutNegativeZero(sorted(fn, input, numberCompare))).toEqual(
          withoutNegativeZero(expected(input)),
        );
      }),
      { examples: [[[0, -0]], [[-0, 0, -0]]] },
    );
  });

  it.runIf(stable)('is stable: keeps the order of equal elements', () => {
    fc.assert(
      fc.property(fc.array(fc.integer({ min: 0, max: 5 }), { maxLength: 100 }), (keys) => {
        const items = keys.map((key, index) => ({ key, index }));
        const result = sorted(fn, items, (a, b) => a.key - b.key);
        const byKeyThenIndex = [...items].sort((a, b) => a.key - b.key || a.index - b.index);
        expect(result).toEqual(byKeyThenIndex);
      }),
    );
  });

  describe.runIf(fast)('large inputs (100 000 elements)', () => {
    const n = 100_000;
    const inputs: Record<string, () => number[]> = {
      sorted: () => range(n),
      reversed: () => range(n).reverse(),
      'all equal': () => new Array(n).fill(1),
      random: () => range(n).map(() => Math.floor(Math.random() * n)),
      'organ pipe': () => range(n).map((i) => Math.min(i, n - i)),
    };

    it.each(Object.keys(inputs))('%s', (kind) => {
      const input = inputs[kind]();
      expect(sorted(fn, input, numberCompare)).toEqual(expected(input));
    });
  });
});

describe.each(integerSorts)('$name sort (integers)', ({ fn }) => {
  it.each([1.5, NaN, Infinity, -Infinity, 2 ** 53])('rejects %s', (value) => {
    expect(() => fn([1, value, 2])).toThrow(TypeError);
  });

  it('sorts 200 000 elements', () => {
    const input = range(200_000).map(() => Math.floor(Math.random() * 1e6) - 5e5);
    expect(sorted<number>(fn, input)).toEqual(expected(input));
  });
});

describe('public API', () => {
  it('exports every algorithm under a short name', () => {
    expect(Object.keys(sort).sort()).toEqual(allSorts.map((s) => s.name).sort());
  });

  it('re-exports the sort namespace and named functions from the package root', () => {
    expect(library.sort).toBe(sort);
    expect(library.quickSort).toBe(quickSort);
  });
});
