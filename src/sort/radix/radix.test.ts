import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('radix sort', () => {
  it('sorts a simple number array', () => {
    const result = sort.radix([170, 45, 75, 90, 802, 24, 2, 66]);
    expect(result).toEqual([2, 24, 45, 66, 75, 90, 170, 802]);
  });
});
