import { describe, expect, it } from 'vitest';
import { sort } from '../..';

describe('shell sort', () => {
  it('sorts a simple number array', () => {
    const array = [8, 4, 1, 6, 3];
    sort.shell(array);
    expect(array).toEqual([1, 3, 4, 6, 8]);
  });
});
