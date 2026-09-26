import { describe, expect, it } from 'vitest';
import { defaultCompare, minMax } from './utils';

describe('defaultCompare', () => {
  it('orders numbers and strings ascending', () => {
    expect(defaultCompare(1, 2)).toBe(-1);
    expect(defaultCompare(2, 1)).toBe(1);
    expect(defaultCompare('a', 'a')).toBe(0);
  });

  it('treats NaN as greater than any number and equal to NaN', () => {
    expect(defaultCompare(NaN, Infinity)).toBe(1);
    expect(defaultCompare(Infinity, NaN)).toBe(-1);
    expect(defaultCompare(NaN, NaN)).toBe(0);
  });
});

describe('minMax', () => {
  it('works on arrays too long for Math.min(...array)', () => {
    const array = Array.from({ length: 500_000 }, (_, i) => i - 1000);
    expect(minMax(array)).toEqual({ min: -1000, max: 498_999 });
  });
});
