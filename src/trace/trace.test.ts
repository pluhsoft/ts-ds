import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
  sortingAlgorithms,
} from '../sort/index.js';
import { replay, trace } from './index.js';

describe('trace', () => {
  it('records the steps of bubble sort', () => {
    const { input, output, steps, stats } = trace(bubbleSort, [3, 1, 2]);
    expect(input).toEqual([3, 1, 2]);
    expect(output).toEqual([1, 2, 3]);
    expect(steps).toEqual([
      { type: 'compare', values: [3, 1], indices: [0, 1], result: 1 },
      { type: 'swap', i: 0, j: 1 },
      { type: 'compare', values: [3, 2], indices: [1, 2], result: 1 },
      { type: 'swap', i: 1, j: 2 },
      { type: 'compare', values: [1, 2], indices: [0, 1], result: -1 },
    ]);
    expect(stats).toEqual({ comparisons: 3, reads: 10, writes: 4, swaps: 2 });
  });

  it('records shifts of insertion sort as writes', () => {
    const { steps } = trace(insertionSort, [2, 1]);
    expect(steps).toEqual([
      { type: 'compare', values: [2, 1], indices: [0, 1], result: 1 },
      { type: 'write', index: 1, value: 2, previous: 1 },
      { type: 'write', index: 0, value: 1, previous: 2 },
    ]);
  });

  it('ignores properties that are not indexes', () => {
    const touchLength = (array: number[]) => {
      array.length = array.length;
    };
    expect(trace(touchLength, [2, 1])).toMatchObject({ steps: [], stats: { writes: 0 } });
  });

  it('counts swaps exactly as the algorithms make them', () => {
    const swaps = (fn: (array: number[]) => void) => trace(fn, [5, 2, 4, 6, 1, 3]).stats.swaps;
    expect(swaps(bubbleSort)).toBe(9); // one per inversion
    expect(swaps(selectionSort)).toBe(3);
    expect(swaps(insertionSort)).toBe(0); // shifts, not swaps
  });

  it('does not modify the input array', () => {
    const input = [3, 1, 2];
    trace(quickSort, input);
    expect(input).toEqual([3, 1, 2]);
  });

  it('passes the comparator to the algorithm', () => {
    const { output, stats } = trace(mergeSort, [1, 3, 2], (a, b) => b - a);
    expect(output).toEqual([3, 2, 1]);
    expect(stats.comparisons).toBeGreaterThan(0);
  });

  it('uses the default order when no comparator is given', () => {
    expect(trace(quickSort, ['b', NaN, 'a'] as unknown[]).output).toEqual(['a', 'b', NaN]);
  });

  it('marks compared values that do not come from the array', () => {
    // Quick sort compares elements with the saved pivot value.
    const compares = trace(quickSort, [5, 2, 4, 6, 1, 3]).steps.filter((s) => s.type === 'compare');
    expect(compares.some((s) => s.indices.length < 2)).toBe(true);
  });

  describe.each(sortingAlgorithms.map((a) => [a.name, a] as const))('%s', (_, algorithm) => {
    it('sorts like the plain function, and replaying the steps gives the same array', () => {
      fc.assert(
        fc.property(fc.array(fc.integer({ min: -50, max: 50 }), { maxLength: 60 }), (input) => {
          const traced = trace(algorithm.sort as (array: number[]) => void, input);
          const plain = [...input];
          algorithm.sort(plain);
          expect(traced.output).toEqual(plain);
          expect(replay(traced.input, traced.steps)).toEqual(traced.output);
        }),
      );
    });

    it.runIf(algorithm.kind === 'integer')('makes no comparisons', () => {
      expect(trace(algorithm.sort as (array: number[]) => void, [3, 1, 2]).stats.comparisons).toBe(
        0,
      );
    });
  });
});

describe('replay', () => {
  it('returns intermediate states', () => {
    const { input, steps } = trace(bubbleSort, [3, 1, 2]);
    expect(replay(input, steps, 0)).toEqual([3, 1, 2]);
    expect(replay(input, steps, 2)).toEqual([1, 3, 2]);
    expect(replay(input, steps, 4)).toEqual([1, 2, 3]);
  });
});
