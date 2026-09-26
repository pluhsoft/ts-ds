import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import * as library from '../index.js';
import {
  type CompareFn,
  type ComparisonSortingAlgorithm,
  quickSort,
  sort,
  sortingAlgorithms,
} from './index.js';

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

// The suites are generated from the metadata, so the documented properties (stability, speed)
// are checked against the real behaviour.
const comparisonSorts = sortingAlgorithms
  .filter((a): a is ComparisonSortingAlgorithm => a.kind === 'comparison')
  .map((a) => ({
    name: a.id,
    fn: a.sort,
    stable: a.stable,
    fast: a.complexity.average !== 'O(n²)',
  }));

const integerSorts = sortingAlgorithms
  .filter((a) => a.kind === 'integer')
  .map((a) => ({ name: a.id, fn: a.sort as (array: number[]) => void }));

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

  const keepsOrderOfEqualElements = fc.property(
    fc.array(fc.integer({ min: 0, max: 5 }), { maxLength: 100 }),
    (keys) => {
      const items = keys.map((key, index) => ({ key, index }));
      const result = sorted(fn, items, (a, b) => a.key - b.key);
      const byKeyThenIndex = [...items].sort((a, b) => a.key - b.key || a.index - b.index);
      expect(result).toEqual(byKeyThenIndex);
    },
  );

  it.runIf(stable)('is stable: keeps the order of equal elements', () => {
    fc.assert(keepsOrderOfEqualElements);
  });

  it.runIf(!stable)('is not stable: some input changes the order of equal elements', () => {
    expect(fc.check(keepsOrderOfEqualElements).failed).toBe(true);
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

  it('describes every algorithm of the sort object in sortingAlgorithms', () => {
    for (const algorithm of sortingAlgorithms) {
      expect(sort[algorithm.id as keyof typeof sort]).toBe(algorithm.sort);
    }
  });

  it('re-exports the sort namespace and named functions from the package root', () => {
    expect(library.sort).toBe(sort);
    expect(library.quickSort).toBe(quickSort);
    expect(library.sortingAlgorithms).toBe(sortingAlgorithms);
    expect(typeof library.trace).toBe('function');
  });
});
