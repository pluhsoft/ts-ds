import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('merge sort', () => {
  it('sorts a simple number array', () => {
    const result = sort.merge([5, 2, 8, 1, 4]);
    expect(result).toEqual([1, 2, 4, 5, 8]);
  });
});
