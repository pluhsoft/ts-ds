import { describe, expect, it } from 'vitest';
import { COUNTING_SORT_MAX_RANGE, countingSort } from './counting';

/** Sorts a copy of `input` and returns it. */
function sorted(input: number[]): number[] {
  const array = [...input];
  countingSort(array);
  return array;
}

describe('counting sort', () => {
  it('handles a range exactly at the limit', () => {
    expect(sorted([COUNTING_SORT_MAX_RANGE - 1, 0])).toEqual([0, COUNTING_SORT_MAX_RANGE - 1]);
  });

  it('rejects a range above the limit instead of running out of memory', () => {
    expect(() => countingSort([0, 1e9])).toThrow(RangeError);
  });

  it('accepts a narrow range of huge values', () => {
    expect(sorted([1e15 + 2, 1e15, 1e15 + 1])).toEqual([1e15, 1e15 + 1, 1e15 + 2]);
  });
});
