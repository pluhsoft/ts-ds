import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('insertion sort', () => {
  it('sorts a simple number array', () => {
    const array = [5, 1, 4, 2, 3];
    sort.insertion(array);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
