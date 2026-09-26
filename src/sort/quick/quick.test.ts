import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('quick sort', () => {
  it('sorts a simple number array', () => {
    const array = [9, 3, 6, 2, 8];
    sort.quick(array);
    expect(array).toEqual([2, 3, 6, 8, 9]);
  });
});
