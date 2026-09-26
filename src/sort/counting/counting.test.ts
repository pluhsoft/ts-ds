import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('counting sort', () => {
  it('sorts a simple number array', () => {
    const result = sort.counting([4, 2, 1, 3, 2]);
    expect(result).toEqual([1, 2, 2, 3, 4]);
  });
});
