import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('bubble sort', () => {
  it('sorts a simple number array', () => {
    const array = [4, 2, 7, 1, 3];
    sort.bubble(array);
    expect(array).toEqual([1, 2, 3, 4, 7]);
  });
});
