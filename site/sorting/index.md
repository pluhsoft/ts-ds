# Sorting algorithms

Sorting puts elements in order. It looks simple, but different algorithms make very different
trade-offs between speed, memory, stability and simplicity — which is why every course on
algorithms starts here.

## Comparison

| Algorithm                | Best     | Average  | Worst    | Memory | Stable | In place |
| ------------------------ | -------- | -------- | -------- | ------ | ------ | -------- |
| [Bubble](./bubble)       | n        | n²       | n²       | 1      | yes    | yes      |
| [Selection](./selection) | n²       | n²       | n²       | 1      | no     | yes      |
| [Insertion](./insertion) | n        | n²       | n²       | 1      | yes    | yes      |
| [Shell](./shell)         | n log n  | ≈ n^1.25 | n^1.5    | 1      | no     | yes      |
| [Merge](./merge)         | n        | n log n  | n log n  | n      | yes    | no       |
| [Quick](./quick)         | n log n  | n log n  | n²       | log n  | no     | yes      |
| [Heap](./heap)           | n log n  | n log n  | n log n  | 1      | no     | yes      |
| [Counting](./counting)   | n + k    | n + k    | n + k    | n + k  | yes    | no       |
| [Radix](./radix)         | d(n + b) | d(n + b) | d(n + b) | n + b  | yes    | no       |

All complexities are O(…). `k` is the range of values, `d` the number of digits, `b` the base (10).

## Key ideas

**Comparison sorts** (bubble … heap) only ask "is `a` less than `b`?". Any such algorithm needs
at least $\log_2 n! \approx n \log_2 n$ comparisons in the worst case: there are $n!$ possible
orders, and each comparison at best halves them. So O(n log n) is the best possible — merge sort
and heap sort reach it always, quick sort on average.

**Counting and radix sort** are not comparison sorts: they use the values themselves as array
indexes. That is how they beat n log n — but they only work for integers (or keys that can be
turned into integers).

**Stability** — equal elements keep their original order. It matters when you sort records by one
key after another: sort people by name, then stably by age, and people of the same age stay in
alphabetical order.

**In place** — the algorithm needs only O(1) (or O(log n)) extra memory besides the array.

## Which one to use

| Situation                             | Choose                                       |
| ------------------------------------- | -------------------------------------------- |
| General purpose, fastest on average   | [Quick sort](./quick)                        |
| Must be stable, or guaranteed n log n | [Merge sort](./merge)                        |
| Guaranteed n log n with O(1) memory   | [Heap sort](./heap)                          |
| Small or almost sorted arrays         | [Insertion sort](./insertion)                |
| Integers in a small range             | [Counting sort](./counting)                  |
| Many integers with few digits         | [Radix sort](./radix)                        |
| Learning the basics                   | [Bubble](./bubble), [Selection](./selection) |

In production JavaScript `Array.prototype.sort` (TimSort, a hybrid of merge and insertion sort) is
usually the right choice. This library shows how the classic algorithms work and gives you reliable
implementations for courses, experiments and special cases.

## Literature

- **CLRS** — T. Cormen, C. Leiserson, R. Rivest, C. Stein. _Introduction to Algorithms_, 4th ed.,
  MIT Press, 2022. Chapters 2, 6, 7, 8.
- **Sedgewick** — R. Sedgewick, K. Wayne. _Algorithms_, 4th ed., Addison-Wesley, 2011. Chapter 2.
- **Knuth** — D. Knuth. _The Art of Computer Programming_, Vol. 3: _Sorting and Searching_, 2nd ed., 1998.
