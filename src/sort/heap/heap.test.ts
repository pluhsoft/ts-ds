import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('heap sort', () => {
  it('sorts a simple number array', () => {
    const array = [5, 9, 1, 3, 7];
    sort.heap(array);
    expect(array).toEqual([1, 3, 5, 7, 9]);
  });
});
