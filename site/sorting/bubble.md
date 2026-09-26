# Bubble sort

## Idea

Walk through the array and swap every pair of neighbours that is in the wrong order. After the
first pass the largest element has "bubbled up" to the end; after the second pass the second
largest is in place, and so on. If a pass makes no swaps, the array is sorted.

## Example

Sorting `[5, 2, 4, 6, 1, 3]`. The sorted tail is in **bold**.

| Pass | Array after the pass | What happened                  |
| ---- | -------------------- | ------------------------------ |
| 1    | 2, 4, 5, 1, 3, **6** | 6 bubbled to the end (4 swaps) |
| 2    | 2, 4, 1, 3, **5, 6** | 5 in place (2 swaps)           |
| 3    | 2, 1, 3, **4, 5, 6** | 4 in place (2 swaps)           |
| 4    | 1, **2, 3, 4, 5, 6** | 3 and 2 in place (1 swap)      |
| 5    | **1, 2, 3, 4, 5, 6** | no swaps — stop                |

15 comparisons, 9 swaps. The number of swaps equals the number of _inversions_ — pairs that are
out of order.

## Pseudocode

```text
BUBBLE-SORT(A)
  for pass = 0 to n − 2
    swapped = false
    for i = 0 to n − pass − 2
      if A[i] > A[i + 1]
        swap A[i] and A[i + 1]
        swapped = true
    if not swapped
      return
```

## Complexity

| Best | Average | Worst | Memory | Stable | In place |
| ---- | ------- | ----- | ------ | ------ | -------- |
| O(n) | O(n²)   | O(n²) | O(1)   | yes    | yes      |

- **Worst case** (reversed array): passes of n − 1, n − 2, …, 1 comparisons —
  $\frac{n(n-1)}{2}$ in total, and every comparison is a swap.
- **Best case** (already sorted): one pass with n − 1 comparisons and no swaps — thanks to the
  `swapped` flag.
- **Stable**: only strictly greater neighbours are swapped, so equal elements never pass each other.

## When to use

Almost never in practice — insertion sort is simpler to reason about and faster. Bubble sort is
valuable as a first algorithm: it shows what "sorted", "pass", "swap" and "inversion" mean.

## Usage

```ts
import { bubbleSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
bubbleSort(array);
bubbleSort(array, (a, b) => b - a); // descending
```

[API reference](/api/functions/bubbleSort)

## Literature

- Knuth, _TAOCP_ Vol. 3, §5.2.2 "Sorting by exchanging".
- CLRS, Problem 2-2 "Correctness of bubblesort".
