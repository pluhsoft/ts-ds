import { describe, it, expect } from 'vitest';
import { RESULT_SMALL_ARRAY, SMALL_ARRAY } from './data';
import { sort } from '../../..';

describe('selection sort', () => {
  it('sorts a small array', () => {
    const array = [...SMALL_ARRAY];
    sort.selection(array);
    expect(array).toEqual(RESULT_SMALL_ARRAY);
  });
});
