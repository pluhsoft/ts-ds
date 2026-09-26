# Quick sort

## Idea

**Divide and conquer**, but the work is done _before_ the recursion:

1. Choose a **pivot** element.
2. **Partition**: rearrange the array so that elements not greater than the pivot come before it
   and elements not less than it come after it. The pivot is now in its final place.
3. Sort both parts recursively.

Unlike merge sort, no merging is needed and no extra array is used.

This implementation follows Hoare and Sedgewick:

- **Median-of-three pivot** — the median of the first, middle and last element. On sorted and
  reversed arrays it picks the true median, so they become the best case instead of the worst.
- **Hoare partitioning** — two indexes move towards each other and swap elements that are on the
  wrong side. Both stop on elements equal to the pivot, so many duplicates are split evenly.
- **Recursion into the smaller part**, a loop for the larger one — the call stack never grows
  beyond O(log n).

## Example

Sorting `[5, 2, 4, 6, 1, 3]`.

**Pivot.** First, middle and last elements are 5, 4, 3; their median **4** is moved to the front:
`4, 2, 3, 6, 1, 5`.

**Partition around 4** — `i` moves right while elements are less than 4, `j` moves left while
elements are greater than 4:

| Step                           | Array                    | Comment                 |
| ------------------------------ | ------------------------ | ----------------------- |
| start                          | 4, 2, 3, 6, 1, 5         | pivot 4 at index 0      |
| `i` stops at 6, `j` stops at 1 | 4, 2, 3, **6**, **1**, 5 | both on the wrong side  |
| swap                           | 4, 2, 3, 1, 6, 5         |                         |
| indexes cross                  | 4, 2, 3, **1**, 6, 5     | `j` = 3                 |
| pivot ↔ A[j]                   | 1, 2, 3, **4**, 6, 5     | 4 is in its final place |

**Recursion.** `[1, 2, 3]` and `[6, 5]` are sorted the same way: `1, 2, 3, 4, 5, 6`.

## Pseudocode

```text
QUICK-SORT(A, low, high)
  while low < high
    p = PARTITION(A, low, high)
    if p − low < high − p              // recurse into the smaller part
      QUICK-SORT(A, low, p − 1)
      low = p + 1
    else
      QUICK-SORT(A, p + 1, high)
      high = p − 1

PARTITION(A, low, high)                // Hoare, as in Sedgewick
  move the median of A[low], A[mid], A[high] to A[low]
  pivot = A[low]
  i = low, j = high + 1
  loop
    repeat i = i + 1 while i < high and A[i] < pivot
    repeat j = j − 1 while pivot < A[j]
    if i ≥ j
      break
    swap A[i] and A[j]
  swap A[low] and A[j]
  return j
```

## Complexity

| Best       | Average    | Worst | Memory   | Stable | In place |
| ---------- | ---------- | ----- | -------- | ------ | -------- |
| O(n log n) | O(n log n) | O(n²) | O(log n) | no     | yes      |

- **Average**: if the pivot splits the array in reasonable proportions, the recursion depth is
  O(log n) and each level does O(n) work. On random input quick sort makes about
  $1.39\, n \log_2 n$ comparisons with a random pivot, and fewer with median-of-three.
- **Worst case** O(n²) happens when the pivot is always the smallest or largest element. With the
  "last element" pivot this is exactly a sorted array! Median-of-three fixes sorted, reversed and
  equal inputs (the library tests check ≤ 1.5 n log₂ n comparisons on them), but special
  "median-of-three killer" inputs still exist. CLRS avoids the problem with high probability by
  choosing a random pivot.
- **Memory** O(log n) for the call stack thanks to recursing into the smaller part.
- **Not stable**: partitioning swaps elements across long distances.

## When to use

The fastest general-purpose comparison sort in practice: few data moves and good cache behaviour.
Choose merge sort if you need stability or a guaranteed O(n log n); introsort (quick sort that
switches to heap sort when recursion gets too deep) combines the strengths of both.

## Usage

```ts
import { quickSort } from 'ts-ds';

const words = ['pear', 'fig', 'banana', 'kiwi'];
quickSort(words, (a, b) => a.length - b.length);
```

[API reference](/api/functions/quickSort)

## Literature

- C. A. R. Hoare. "Quicksort". _The Computer Journal_ 5(1), 1962.
- CLRS, Chapter 7 "Quicksort" (Lomuto partitioning, randomized quicksort, analysis).
- Sedgewick, _Algorithms_, §2.3 "Quicksort" (Hoare partitioning, median-of-three).
- D. Musser. "Introspective Sorting and Selection Algorithms", 1997.
