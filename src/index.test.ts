import { expect } from 'chai';
import { APlusB } from './index';

describe('first test', () => {
  it('it should be pass', () => {
    console.log('win');
  });
  it('it APluB return 5', () => {
    const sum = APlusB(2, 3);
    expect(sum).to.be.eq(5);
  });
});
