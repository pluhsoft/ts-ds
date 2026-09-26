# Tracing and metadata

## See every step of an algorithm

`trace` runs any sorting function and records every comparison and every change of the array —
without changing the algorithm. It is the basis for visualizations and a handy tool for lab work:
count comparisons, check a hand-made trace, compare algorithms on the same data.

```ts
import { bubbleSort, trace } from 'ts-ds';

const { input, output, steps, stats } = trace(bubbleSort, [3, 1, 2]);

output; // [1, 2, 3] — the input array is not modified
stats; // { comparisons: 3, reads: 10, writes: 4, swaps: 2 }
steps;
// [
//   { type: 'compare', values: [3, 1], indices: [0, 1], result: 1 },
//   { type: 'swap', i: 0, j: 1 },
//   { type: 'compare', values: [3, 2], indices: [1, 2], result: 1 },
//   { type: 'swap', i: 1, j: 2 },
//   { type: 'compare', values: [1, 2], indices: [0, 1], result: -1 },
// ]
```

Steps are of three kinds:

| Step      | Meaning                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| `compare` | The comparator was called with `values`; `indices` are their positions in the array.                       |
| `swap`    | Elements at `i` and `j` were exchanged.                                                                    |
| `write`   | `value` was written at `index` (a shift in insertion sort, a merge step, …); `previous` is what was there. |

## Replay

`replay(input, steps, count)` returns the array after the first `count` steps — every frame of an
animation:

```ts
import { replay } from 'ts-ds';

replay(input, steps, 0); // [3, 1, 2]
replay(input, steps, 2); // [1, 3, 2] — after the first swap
replay(input, steps); // [1, 2, 3]
```

## Compare algorithms

`sortingAlgorithms` describes every algorithm: name, complexity, stability, whether it sorts in
place. Together with `trace` it gives a comparison table in a few lines:

```ts
import { sortingAlgorithms, trace } from 'ts-ds';

const data = [5, 2, 4, 6, 1, 3];
for (const algorithm of sortingAlgorithms) {
  if (algorithm.kind === 'comparison') {
    const { stats } = trace(algorithm.sort, data);
    console.log(algorithm.name, algorithm.complexity.average, stats.comparisons, stats.swaps);
  }
}
```

| Algorithm      | Average    | Comparisons | Swaps | Writes |
| -------------- | ---------- | ----------- | ----- | ------ |
| Bubble sort    | O(n²)      | 15          | 9     | 18     |
| Selection sort | O(n²)      | 15          | 3     | 6      |
| Insertion sort | O(n²)      | 12          | 0     | 14     |
| Shell sort     | O(n^1.25)  | 11          | 0     | 12     |
| Merge sort     | O(n log n) | 16          | 0     | 16     |
| Quick sort     | O(n log n) | 21          | 9     | 22     |
| Heap sort      | O(n log n) | 16          | 11    | 22     |

On six elements the "fast" algorithms are not faster yet — the difference appears on large arrays.
Try `n = 1000`.

## How it works

The array is wrapped in a [`Proxy`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
that sees every read and write, and the comparator in a function that counts calls. The algorithms
are exactly the same functions you import, so the trace shows what really happens — and without
`trace` they run with no overhead.

Limitations:

- `indices` of a comparison are empty when a value does not come straight from the array: quick
  sort compares with a saved pivot, merge sort with elements of its buffer.
- Counting and radix sort do their work in auxiliary arrays; the trace shows only how the result is
  written back.

[API reference: trace](/api/functions/trace) · [replay](/api/functions/replay) ·
[sortingAlgorithms](/api/variables/sortingAlgorithms)
