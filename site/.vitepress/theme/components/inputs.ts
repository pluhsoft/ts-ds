export type InputKind = 'random' | 'nearlySorted' | 'reversed' | 'fewUnique';

/** Values 1..n in a random order (Fisher–Yates shuffle). */
function shuffled(n: number): number[] {
  const values = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
}

/** Test data of size `n` for the visualizer: positive integers, so every algorithm accepts it. */
export function makeInput(kind: InputKind, n: number): number[] {
  switch (kind) {
    case 'random':
      return shuffled(n);
    case 'reversed':
      return Array.from({ length: n }, (_, i) => n - i);
    case 'nearlySorted': {
      const values = Array.from({ length: n }, (_, i) => i + 1);
      for (let k = 0; k < Math.max(1, Math.floor(n / 10)); k += 1) {
        const i = Math.floor(Math.random() * (n - 1));
        [values[i], values[i + 1]] = [values[i + 1], values[i]];
      }
      return values;
    }
    case 'fewUnique':
      return Array.from(
        { length: n },
        () => (1 + Math.floor(Math.random() * 4)) * Math.ceil(n / 4),
      );
  }
}

/** Parses "5, 2, 4" into numbers; null unless it is 2..60 integers. */
export function parseInput(text: string): number[] | null {
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  const values = parts.map(Number);
  if (values.length < 2 || values.length > 60 || !values.every(Number.isSafeInteger)) {
    return null;
  }
  return values;
}
