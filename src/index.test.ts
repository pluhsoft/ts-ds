import { describe, it, expect } from 'vitest';
import { sort } from './index';

describe('sort API', () => {
  it('runs selection sort', () => {
    const array = [3, 1, 2];
    sort.selection(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
