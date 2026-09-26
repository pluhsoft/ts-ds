import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import * as library from '../index.js';
import { traceSearch } from '../trace/index.js';
import {
  binarySearch,
  interpolationSearch,
  linearSearch,
  lowerBound,
  search,
  searchingAlgorithms,
  upperBound,
} from './index.js';

const sortedArray = fc
  .array(fc.integer({ min: -20, max: 20 }), { maxLength: 60 })
  .map((a) => a.sort((x, y) => x - y));

describe.each(searchingAlgorithms.map((a) => [a.name, a] as const))('%s', (_, algorithm) => {
  it('finds the first occurrence in a sorted array, like indexOf', () => {
    fc.assert(
      fc.property(sortedArray, fc.integer({ min: -25, max: 25 }), (array, target) => {
        expect(algorithm.search(array, target)).toBe(array.indexOf(target));
      }),
      {
        examples: [
          [[], 1],
          [[5], 5],
          [[1, 1, 1], 1],
          [[1, 2, 2, 2, 3], 2],
        ],
      },
    );
  });

  it('works on long arrays', () => {
    const array = Array.from({ length: 100_000 }, (_, i) => i * 2);
    expect(algorithm.search(array, 99_998 * 2)).toBe(99_998);
    expect(algorithm.search(array, 3)).toBe(-1);
  });
});

describe('linearSearch', () => {
  it('works on unsorted arrays and with a comparator', () => {
    expect(linearSearch([3, 1, 2, 1], 1)).toBe(1);
    const people = [{ age: 30 }, { age: 20 }];
    expect(linearSearch(people, { age: 20 }, (a, b) => a.age - b.age)).toBe(1);
  });
});

describe('lowerBound and upperBound', () => {
  it('match the definition on any sorted array', () => {
    fc.assert(
      fc.property(sortedArray, fc.integer({ min: -25, max: 25 }), (array, target) => {
        const lower = array.findIndex((x) => x >= target);
        const upper = array.findIndex((x) => x > target);
        expect(lowerBound(array, target)).toBe(lower === -1 ? array.length : lower);
        expect(upperBound(array, target)).toBe(upper === -1 ? array.length : upper);
      }),
    );
  });

  it('count the occurrences of a value', () => {
    const array = [1, 2, 2, 2, 5];
    expect(upperBound(array, 2) - lowerBound(array, 2)).toBe(3);
  });
});

describe('binarySearch', () => {
  it('uses the comparator order', () => {
    const words = ['kiwi', 'fig', 'pear'].sort();
    expect(binarySearch(words, 'pear')).toBe(2);
    expect(binarySearch([5, 3, 1], 3, (a, b) => b - a)).toBe(1);
  });
});

describe('interpolationSearch', () => {
  it('returns -1 for NaN and values outside the range', () => {
    expect(interpolationSearch([1, 2, 3], NaN)).toBe(-1);
    expect(interpolationSearch([1, 2, 3], Infinity)).toBe(-1);
    expect(interpolationSearch([1, 2, 3], 0)).toBe(-1);
  });

  it('needs few probes on uniform data', () => {
    const array = Array.from({ length: 1_000_000 }, (_, i) => i * 3);
    const { result, stats } = traceSearch(interpolationSearch, array, 123_456 * 3);
    expect(result).toBe(123_456);
    expect(stats.probes).toBeLessThan(10);
  });
});

describe('traceSearch', () => {
  it('records probes and comparisons of binary search', () => {
    const { result, steps, stats } = traceSearch(binarySearch, [1, 3, 5, 7], 5);
    expect(result).toBe(2);
    expect(steps.filter((s) => s.type === 'probe').map((s) => s.index)).toEqual([2, 1, 2]);
    expect(stats).toEqual({ probes: 3, comparisons: 3 });
  });

  it('counts about log2(n) probes for binary search', () => {
    const array = Array.from({ length: 1024 }, (_, i) => i);
    expect(traceSearch(binarySearch, array, 700).stats.comparisons).toBeLessThanOrEqual(12);
  });
});

describe('public API', () => {
  it('exports the search namespace from the package root', () => {
    expect(library.search).toBe(search);
    expect(library.binarySearch).toBe(binarySearch);
    expect(typeof library.traceSearch).toBe('function');
  });
});
