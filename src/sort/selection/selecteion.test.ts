import { expect } from 'chai';
import { RESULT_SMALL_ARRAY, SMALL_ARRAY } from './data';
import { selection } from './selection';

describe('sort selection', () => {
  it('sort small array', () => {
    selection(SMALL_ARRAY);
    expect(SMALL_ARRAY).to.be.deep.eq(RESULT_SMALL_ARRAY);
  });
});
