# Merge sort

## Idea

**Divide and conquer**:

1. **Divide** the array into two halves.
2. **Conquer** — sort each half recursively (an array of one element is already sorted).
3. **Combine** — _merge_ the two sorted halves: repeatedly take the smaller of the two front
   elements.

Merging two sorted lists of total length n takes only n − 1 comparisons, and that is the whole
trick.

## Example

Sorting `[5, 2, 4, 6, 1, 3]`:

```text
                [5, 2, 4, 6, 1, 3]
               /                  \
        [5, 2, 4]                [6, 1, 3]
         /     \                  /     \
     [5, 2]    [4]            [6, 1]    [3]
     /    \                   /    \
   [5]    [2]               [6]    [1]
     \    /                   \    /
     [2, 5]    [4]            [1, 6]    [3]
         \     /                  \     /
        [2, 4, 5]                [1, 3, 6]
               \                  /
                [1, 2, 3, 4, 5, 6]
```

The last merge step by step — compare the front elements, take the smaller one:

| Left        | Right       | Take | Result so far    |
| ----------- | ----------- | ---- | ---------------- |
| **2**, 4, 5 | **1**, 3, 6 | 1    | 1                |
| **2**, 4, 5 | **3**, 6    | 2    | 1, 2             |
| **4**, 5    | **3**, 6    | 3    | 1, 2, 3          |
| **4**, 5    | **6**       | 4    | 1, 2, 3, 4       |
| **5**       | **6**       | 5    | 1, 2, 3, 4, 5    |
| —           | 6           | 6    | 1, 2, 3, 4, 5, 6 |

## Try it

The same example, step by step. Change the data or press Play.

<ClientOnly>
  <SortVisualizer algorithm="merge" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocode

```text
MERGE-SORT(A, low, high)
  if low ≥ high
    return
  mid = ⌊(low + high) / 2⌋
  MERGE-SORT(A, low, mid)
  MERGE-SORT(A, mid + 1, high)
  if A[mid] ≤ A[mid + 1]              // halves already in order
    return
  MERGE(A, low, mid, high)

MERGE(A, low, mid, high)
  copy A[low..high] to B[low..high]
  i = low, j = mid + 1
  for k = low to high
    if i > mid:            A[k] = B[j], j = j + 1
    else if j > high:      A[k] = B[i], i = i + 1
    else if B[j] < B[i]:   A[k] = B[j], j = j + 1
    else:                  A[k] = B[i], i = i + 1   // on ties take the left: stable
```

## Complexity

| Best | Average    | Worst      | Memory | Stable | In place |
| ---- | ---------- | ---------- | ------ | ------ | -------- |
| O(n) | O(n log n) | O(n log n) | O(n)   | yes    | no       |

- The recurrence $T(n) = 2T(n/2) + \Theta(n)$ gives $T(n) = \Theta(n \log n)$: the recursion tree
  has $\log_2 n$ levels and every level merges n elements in total.
- The check `A[mid] ≤ A[mid + 1]` skips merging halves that are already in order, so a sorted array
  takes O(n).
- **Memory** O(n) for the buffer — one buffer is allocated once and reused.
- **Stable**: on equal elements the merge takes the one from the left half first.

## When to use

When you need a **stable** sort or a **guaranteed** O(n log n). It is also the basis of external
sorting (data that does not fit in memory) and of TimSort, the algorithm behind
`Array.prototype.sort`.

## Usage

```ts
import { mergeSort } from 'ts-ds';

const tasks = [
  { title: 'B', priority: 2 },
  { title: 'A', priority: 1 },
  { title: 'C', priority: 2 },
];
mergeSort(tasks, (a, b) => a.priority - b.priority);
// A (1), B (2), C (2) — B stays before C
```

[API reference](/api/functions/mergeSort)

## Literature

- CLRS, §2.3 "Designing algorithms" (merge sort and divide and conquer), Chapter 4 (recurrences).
- Sedgewick, _Algorithms_, §2.2 "Mergesort".
- Knuth, _TAOCP_ Vol. 3, §5.2.4 "Sorting by merging".
