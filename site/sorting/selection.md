# Selection sort

## Idea

Find the smallest element and put it first. Then find the smallest among the rest and put it
second. Repeat until the whole array is in order. The array is split into a sorted prefix and an
unsorted suffix; every step moves one element from the suffix to the end of the prefix.

## Example

Sorting `[5, 2, 4, 6, 1, 3]`. The sorted prefix is in **bold**.

| Step | Minimum of the rest  | Array after the step |
| ---- | -------------------- | -------------------- |
| 1    | 1 → swap with 5      | **1**, 2, 4, 6, 5, 3 |
| 2    | 2 → already in place | **1, 2**, 4, 6, 5, 3 |
| 3    | 3 → swap with 4      | **1, 2, 3**, 6, 5, 4 |
| 4    | 4 → swap with 6      | **1, 2, 3, 4**, 5, 6 |
| 5    | 5 → already in place | **1, 2, 3, 4, 5, 6** |

15 comparisons, only 3 swaps.

## Try it

The same example, step by step. Change the data or press Play.

<ClientOnly>
  <SortVisualizer algorithm="selection" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocode

```text
SELECTION-SORT(A)
  for i = 0 to n − 2
    min = i
    for j = i + 1 to n − 1
      if A[j] < A[min]
        min = j
    if min ≠ i
      swap A[i] and A[min]
```

## Complexity

| Best  | Average | Worst | Memory | Stable | In place |
| ----- | ------- | ----- | ------ | ------ | -------- |
| O(n²) | O(n²)   | O(n²) | O(1)   | no     | yes      |

- Always exactly $\frac{n(n-1)}{2}$ comparisons: finding a minimum requires looking at every
  remaining element, whatever the input.
- At most n − 1 swaps — fewer than any other algorithm here. Useful when writing is much more
  expensive than reading (e.g. flash memory).
- **Not stable**: a long-distance swap can jump over an equal element. In `[2a, 2b, 1]` the first
  step swaps `2a` and `1`, giving `[1, 2b, 2a]`.

## When to use

When the number of writes matters more than the number of comparisons, or as a teaching example
of the "sorted prefix + unsorted suffix" invariant.

## Usage

```ts
import { selectionSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
selectionSort(array);
```

[API reference](/api/functions/selectionSort)

## Literature

- Knuth, _TAOCP_ Vol. 3, §5.2.3 "Sorting by selection".
- Sedgewick, _Algorithms_, §2.1.
