# Searching algorithms

Find the position of a value in an array. All functions return the index of the **first** element
equal to the target, or `-1` — the same contract as `Array.prototype.indexOf`.

<ClientOnly>
  <SearchVisualizer />
</ClientOnly>

| Algorithm                              | Array          | Best     | Average      | Worst    |
| -------------------------------------- | -------------- | -------- | ------------ | -------- |
| [Linear](#linear-search)               | any            | O(1)     | O(n)         | O(n)     |
| [Binary](#binary-search)               | sorted         | O(log n) | O(log n)     | O(log n) |
| [Exponential](#exponential-search)     | sorted         | O(1)     | O(log i)     | O(log i) |
| [Interpolation](#interpolation-search) | sorted numbers | O(1)     | O(log log n) | O(n)     |

All of them use O(1) memory. `i` is the position of the target.

## Linear search

Check the elements one by one from the left. The only choice for an unsorted array, and often the
fastest one for a few dozen elements.

```text
for i = 0 to n − 1
  if A[i] = target: return i
return −1
```

## Binary search

In a sorted array, compare the target with the middle element: if the middle is smaller, the target
can only be in the right half, otherwise in the left one. Each step halves the range, so an array
of a million elements needs about 20 comparisons.

The library implements it as **lower bound** — the first position where `A[i] ≥ target` — which
finds the first of equal elements and never loops forever:

```text
LOWER-BOUND(A, target)
  low = 0, high = n
  while low < high
    mid = ⌊(low + high) / 2⌋
    if A[mid] < target: low = mid + 1
    else high = mid
  return low
```

`lowerBound` and `upperBound` (first `A[i] > target`) are exported too: `upperBound − lowerBound` is
the number of occurrences, and `lowerBound` is where to insert a value to keep the array sorted.

## Exponential search

Check positions 1, 2, 4, 8, … until the element is not less than the target, then run binary
search between the last two positions. It takes O(log i) steps, where `i` is the position of the
target — faster than binary search when the target is near the beginning, and it works for lists
whose length is unknown or infinite.

## Interpolation search

Binary search always looks in the middle. Interpolation search estimates where the target should be
from the values, the way you open a dictionary near the end for a word starting with "w":

$$pos = low + \frac{(target - A[low]) \cdot (high - low)}{A[high] - A[low]}$$

On uniformly distributed numbers it needs only O(log log n) steps — about 4 for a million
elements. On skewed data, like `1, 2, 3, …, 1000, 1 000 000`, the estimate is poor and it degrades
to O(n). Works with numbers only.

## Usage

```ts
import { binarySearch, linearSearch, lowerBound, traceSearch } from 'ts-ds';

const sorted = [1, 3, 3, 5, 8, 13];
binarySearch(sorted, 3); // 1 — the first 3
binarySearch(sorted, 4); // -1
lowerBound(sorted, 4); // 3 — insert 4 here to keep the order
linearSearch([7, 2, 9], 9); // 2 — no sorting needed

traceSearch(binarySearch, sorted, 8).stats; // how many elements it looked at
```

Arrays for binary, exponential and interpolation search must be sorted in the order of the
comparator (ascending by default). This is not checked — checking would take O(n) and defeat the
purpose.

## Literature

- CLRS, Exercise 2.3-6 (binary search).
- Knuth, _TAOCP_ Vol. 3, §6.1 "Sequential searching" and §6.2.1 "Searching an ordered table".
- J. L. Bentley, A. C.-C. Yao. "An almost optimal algorithm for unbounded searching", 1976
  (exponential search).
- Y. Perl, A. Itai, H. Avni. "Interpolation search — a log log N search", _CACM_ 21(7), 1978.
