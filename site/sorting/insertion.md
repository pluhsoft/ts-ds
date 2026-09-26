# Insertion sort

## Idea

The way most people sort a hand of cards: take the next card and insert it into its place among
the cards already in your hand. The prefix `A[0..i−1]` is always sorted; step `i` inserts `A[i]`
into it by shifting greater elements one position to the right.

## Example

Sorting `[5, 2, 4, 6, 1, 3]` — the example from CLRS. The sorted prefix is in **bold**.

| Step | Inserted | Array after the step | Shifts |
| ---- | -------- | -------------------- | ------ |
| 1    | 2        | **2, 5**, 4, 6, 1, 3 | 1      |
| 2    | 4        | **2, 4, 5**, 6, 1, 3 | 1      |
| 3    | 6        | **2, 4, 5, 6**, 1, 3 | 0      |
| 4    | 1        | **1, 2, 4, 5, 6**, 3 | 4      |
| 5    | 3        | **1, 2, 3, 4, 5, 6** | 3      |

12 comparisons, 9 shifts — again the number of inversions.

## Try it

The same example, step by step. Change the data or press Play.

<ClientOnly>
  <SortVisualizer algorithm="insertion" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocode

```text
INSERTION-SORT(A)
  for i = 1 to n − 1
    key = A[i]
    j = i − 1
    while j ≥ 0 and A[j] > key
      A[j + 1] = A[j]
      j = j − 1
    A[j + 1] = key
```

## Complexity

| Best | Average | Worst | Memory | Stable | In place |
| ---- | ------- | ----- | ------ | ------ | -------- |
| O(n) | O(n²)   | O(n²) | O(1)   | yes    | yes      |

- Running time is O(n + I), where I is the number of inversions. A sorted array has 0 inversions
  (O(n)), a reversed one has $\frac{n(n-1)}{2}$ (O(n²)), a random one about $\frac{n^2}{4}$.
- **Adaptive**: the closer the array is to sorted, the faster it runs.
- **Stable**: an element stops at the first element that is not greater, so it never passes an
  equal one.
- **Online**: can sort data as it arrives.

## When to use

Small arrays (up to a few dozen elements) and nearly sorted data. That is why fast hybrid
algorithms — TimSort in `Array.prototype.sort`, introsort in C++ — switch to insertion sort for
small pieces.

## Usage

```ts
import { insertionSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
insertionSort(array);
```

[API reference](/api/functions/insertionSort)

## Literature

- CLRS, §2.1 "Insertion sort" and §2.2 "Analyzing algorithms".
- Knuth, _TAOCP_ Vol. 3, §5.2.1.
