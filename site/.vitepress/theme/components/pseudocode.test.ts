import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { sortingAlgorithms, trace } from '../../../../src/index.js';
import { pseudocode } from './pseudocode.js';

describe.each(sortingAlgorithms.map((a) => [a.id, a] as const))(
  '%s pseudocode',
  (id, algorithm) => {
    const code = pseudocode[id];

    it('explains every step of the real trace with a line of the pseudocode', () => {
      fc.assert(
        fc.property(fc.array(fc.integer({ min: 0, max: 30 }), { maxLength: 40 }), (input) => {
          const { steps } = trace(algorithm.sort as (array: number[]) => void, input);
          const lines = code.lines(input.length, steps);
          expect(lines).toHaveLength(steps.length);
          for (const line of lines) {
            expect(line).toBeGreaterThanOrEqual(0);
            expect(line).toBeLessThan(code.code.length);
          }
        }),
        { examples: [[[]], [[1]], [[2, 1]], [[1, 1, 1]], [[5, 2, 4, 6, 1, 3]]] },
      );
    });
  },
);

describe('pseudocode lines', () => {
  it('distinguishes shifts from the final placement in insertion sort', () => {
    const { steps } = trace(sortingAlgorithms[2].sort as (array: number[]) => void, [2, 1]);
    // compare 2 > 1, shift 2 right, put 1 at position 0
    expect(pseudocode.insertion.lines(2, steps)).toEqual([2, 3, 4]);
  });

  it('marks the extraction swaps of heap sort', () => {
    const { steps } = trace(sortingAlgorithms[6].sort as (array: number[]) => void, [1, 2, 3]);
    const lines = pseudocode.heap.lines(3, steps);
    expect(lines.filter((line) => line === 2)).toHaveLength(2); // n − 1 extractions
  });
});
