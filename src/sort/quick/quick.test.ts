import { describe, expect, it } from 'vitest';
import { quickSort } from './quick.js';

/** Number of comparisons quick sort makes on `input`, relative to n·log₂n. */
function comparisonsPerNLogN(input: number[]): number {
  let comparisons = 0;
  quickSort(input, (a, b) => {
    comparisons += 1;
    return a - b;
  });
  return comparisons / (input.length * Math.log2(input.length));
}

describe('quick sort', () => {
  const n = 100_000;
  const inputs: Record<string, number[]> = {
    sorted: Array.from({ length: n }, (_, i) => i),
    reversed: Array.from({ length: n }, (_, i) => n - i),
    'all equal': new Array(n).fill(0),
    'three distinct values': Array.from({ length: n }, (_, i) => i % 3),
  };

  it.each(Object.keys(inputs))('makes O(n log n) comparisons on %s input', (kind) => {
    expect(comparisonsPerNLogN(inputs[kind])).toBeLessThan(1.5);
  });
});
