import { describe, expect, it } from 'vitest';
import { radixSort } from './radix';

/** Sorts a copy of `input` and returns it. */
function sorted(input: number[]): number[] {
  const array = [...input];
  radixSort(array);
  return array;
}

describe('radix sort', () => {
  it('sorts values with different numbers of digits', () => {
    expect(sorted([170, 45, 75, 90, 802, 24, 2, 66])).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
  });

  it('sorts the largest safe integers', () => {
    const max = Number.MAX_SAFE_INTEGER;
    expect(sorted([max, -max, 0, max - 1, -(max - 1)])).toEqual([
      -max,
      -(max - 1),
      0,
      max - 1,
      max,
    ]);
  });

  it('keeps -0 unchanged and orders it as 0', () => {
    const result = sorted([1, -0, -1]);
    expect(result).toEqual([-1, -0, 1]);
    expect(Object.is(result[1], -0)).toBe(true);
  });
});
