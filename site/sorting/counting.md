# Counting sort

## Idea

If the values are integers from a small range, we don't need to compare them at all. Count how
many times each value occurs, then compute for every value how many elements are **not greater**
than it — that is exactly its last position in the sorted array.

With `k = max − min + 1` possible values:

1. `count[v]` — how many times `v` occurs.
2. **Prefix sums**: `count[v] = count[0] + … + count[v]` — how many elements are ≤ `v`.
3. Walk the input **from the end** and put every value at position `--count[v]`. Walking backwards
   keeps equal values in their original order — the sort is **stable**, which radix sort relies on.

## Example

Sorting `[2, 5, 3, 0, 2, 3, 0, 3]` — the example from CLRS (values 0…5).

| Value                 | 0   | 1   | 2   | 3   | 4   | 5   |
| --------------------- | --- | --- | --- | --- | --- | --- |
| `count` (occurrences) | 2   | 0   | 2   | 3   | 0   | 1   |
| `count` (prefix sums) | 2   | 2   | 4   | 7   | 7   | 8   |

Placing from the end: the last `3` goes to position `7 − 1 = 6`, the last `0` to `2 − 1 = 1`, the
next `3` to `6 − 1 = 5`, and so on. Result: `0, 0, 2, 2, 3, 3, 3, 5`.

## Try it

The same example, step by step. Change the data or press Play.

<ClientOnly>
  <SortVisualizer algorithm="counting" :input="[2, 5, 3, 0, 2, 3, 0, 3]" />
</ClientOnly>

## Pseudocode

```text
COUNTING-SORT(A)
  min, max = minimum and maximum of A
  k = max − min + 1
  count[0..k − 1] = 0
  for each v in A
    count[v − min] = count[v − min] + 1
  for v = 1 to k − 1
    count[v] = count[v] + count[v − 1]
  for i = n − 1 downto 0
    v = A[i]
    count[v − min] = count[v − min] − 1
    B[count[v − min]] = v
  copy B to A
```

## Complexity

| Best     | Average  | Worst    | Memory   | Stable | In place |
| -------- | -------- | -------- | -------- | ------ | -------- |
| O(n + k) | O(n + k) | O(n + k) | O(n + k) | yes    | no       |

- Linear time when `k = O(n)`. This does not contradict the Ω(n log n) lower bound: that bound only
  applies to algorithms that compare elements.
- **Memory** O(k) for the counters — for values like `[0, 1 000 000 000]` that would be gigabytes.
  The library limits `k` to `COUNTING_SORT_MAX_RANGE` = 2²⁶ and throws a `RangeError` above it:
  use radix sort for wide ranges.
- **Integers only.** `1.5`, `NaN` or `Infinity` throw a `TypeError`. Negative values are fine —
  they are shifted by `min`.

## When to use

Integers (or keys that map to integers: ages, grades, bytes) in a range not much larger than the
number of elements. And as a building block of radix sort.

## Usage

```ts
import { countingSort } from 'ts-ds';

const grades = [4, 5, 3, 5, 2, 4, 5];
countingSort(grades); // [2, 3, 4, 4, 5, 5, 5]
```

[API reference](/api/functions/countingSort)

## Literature

- H. H. Seward, 1954 (MIT master's thesis).
- CLRS, §8.1 "Lower bounds for sorting" and §8.2 "Counting sort".
