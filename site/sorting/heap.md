# Heap sort

## Idea

A **binary max-heap** is an array seen as a complete binary tree: the children of `A[i]` are
`A[2i + 1]` and `A[2i + 2]`, and every parent is not less than its children. So the largest
element is always at the root `A[0]`.

1. **Build a heap** from the array.
2. Swap the root (the maximum) with the last element of the heap — the maximum is now in its final
   place. Shrink the heap by one and **sift down** the new root to restore the heap property.
3. Repeat until the heap is empty.

## Example

Sorting `[5, 2, 4, 6, 1, 3]`.

**1. Build the max-heap** — sift down every parent, from the last one to the root:

```text
      5                5                6
    /   \            /   \            /   \
   2     4    →     6     4    →     5     4
  / \   /          / \   /          / \   /
 6   1 3          2   1 3          2   1 3
```

Heap as an array: `6, 5, 4, 2, 1, 3`.

**2. Extract the maximum** repeatedly. The sorted tail is in **bold**:

| Step | Swap root with the last | After sift-down      |
| ---- | ----------------------- | -------------------- |
| 1    | 3, 5, 4, 2, 1, **6**    | 5, 3, 4, 2, 1, **6** |
| 2    | 1, 3, 4, 2, **5, 6**    | 4, 3, 1, 2, **5, 6** |
| 3    | 2, 3, 1, **4, 5, 6**    | 3, 2, 1, **4, 5, 6** |
| 4    | 1, 2, **3, 4, 5, 6**    | 2, 1, **3, 4, 5, 6** |
| 5    | 1, **2, 3, 4, 5, 6**    | **1, 2, 3, 4, 5, 6** |

## Pseudocode

```text
HEAP-SORT(A)
  for i = ⌊n / 2⌋ − 1 downto 0          // build the heap
    SIFT-DOWN(A, i, n)
  for end = n − 1 downto 1
    swap A[0] and A[end]
    SIFT-DOWN(A, 0, end)

SIFT-DOWN(A, i, size)                   // heap is A[0..size − 1]
  loop
    largest = i
    l = 2i + 1, r = 2i + 2
    if l < size and A[l] > A[largest]: largest = l
    if r < size and A[r] > A[largest]: largest = r
    if largest = i: return
    swap A[i] and A[largest]
    i = largest
```

## Complexity

| Best       | Average    | Worst      | Memory | Stable | In place |
| ---------- | ---------- | ---------- | ------ | ------ | -------- |
| O(n log n) | O(n log n) | O(n log n) | O(1)   | no     | yes      |

- **Building the heap takes only O(n)**, not O(n log n): most nodes are near the bottom and sift
  down just a few levels ($\sum_h \frac{n}{2^{h+1}} \cdot h = O(n)$).
- Each of the n − 1 extractions sifts down through at most $\log_2 n$ levels: O(n log n) in total,
  **for any input**.
- **Memory** O(1): the heap lives inside the array itself.
- **Not stable**: swapping the root with the last element moves elements far away.

## When to use

When you need a **guaranteed** O(n log n) **without extra memory**. In practice it is slower than
quick sort because it jumps around the array (poor cache locality). The same heap is the basis of
a **priority queue**.

## Usage

```ts
import { heapSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
heapSort(array);
```

[API reference](/api/functions/heapSort)

## Literature

- J. W. J. Williams. "Algorithm 232: Heapsort". _Communications of the ACM_ 7(6), 1964.
- CLRS, Chapter 6 "Heapsort".
- Sedgewick, _Algorithms_, §2.4 "Priority queues".
