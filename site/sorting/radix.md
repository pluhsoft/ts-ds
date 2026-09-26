# Radix sort

## Idea

Sort numbers **digit by digit, starting from the least significant digit** (LSD). Each pass is a
**stable** sort by one digit — counting sort with only 10 possible values. Because every pass is
stable, the order established by the lower digits is kept among numbers with the same higher
digit. After the pass over the most significant digit the array is sorted.

Negative numbers are sorted separately by their absolute value and put in front in reverse order.

## Example

Sorting `[170, 45, 75, 90, 802, 24, 2, 66]`. The digit of the current pass is in **bold**; leading
zeros are shown in the last pass for clarity.

| Pass     | Array after the pass                                                   |
| -------- | ---------------------------------------------------------------------- |
| input    | 170, 45, 75, 90, 802, 24, 2, 66                                        |
| ones     | 17**0**, 9**0**, 80**2**, **2**, 2**4**, 4**5**, 7**5**, 6**6**        |
| tens     | 8**0**2, **0**2, **2**4, **4**5, **6**6, 1**7**0, **7**5, **9**0       |
| hundreds | **0**02, **0**24, **0**45, **0**66, **0**75, **0**90, **1**70, **8**02 |

Look at 170 and 75 after the tens pass: both have 7 tens, and 170 stays before 75 because it was
before it after the ones pass (0 < 5). That is why every pass must be stable.

## Try it

The same example, step by step. Change the data or press Play.

<ClientOnly>
  <SortVisualizer algorithm="radix" :input="[170, 45, 75, 90, 802, 24, 2, 66]" />
</ClientOnly>

## Pseudocode

```text
RADIX-SORT(A)                          // non-negative integers
  max = maximum of A
  place = 1
  while ⌊max / place⌋ > 0
    stable COUNTING-SORT of A by digit ⌊A[i] / place⌋ mod 10
    place = place × 10
```

## Complexity

| Best        | Average     | Worst       | Memory   | Stable | In place |
| ----------- | ----------- | ----------- | -------- | ------ | -------- |
| O(d(n + b)) | O(d(n + b)) | O(d(n + b)) | O(n + b) | yes    | no       |

- `d` — number of digits of the largest absolute value, `b = 10` — the base. For numbers with a
  bounded number of digits this is **linear** in n.
- Unlike counting sort, memory does not depend on the range of values: `[0, 1 000 000 000]` needs
  10 passes, not a billion counters.
- **Integers only** (up to `Number.MAX_SAFE_INTEGER`); anything else throws a `TypeError`.

## When to use

Many integers with a limited number of digits: IDs, timestamps, zip codes. Also for strings of
equal length (sorting by characters instead of digits) and as the idea behind sorting keys made of
several fields.

## Usage

```ts
import { radixSort } from 'ts-ds';

const ids = [170, 45, 75, -90, 802, 24, 2, 66];
radixSort(ids); // [-90, 2, 24, 45, 66, 75, 170, 802]
```

[API reference](/api/functions/radixSort)

## Literature

- H. Hollerith's tabulating machines (1890s) sorted punched cards this way.
- CLRS, §8.3 "Radix sort".
- Sedgewick, _Algorithms_, §5.1 "String sorts" (LSD and MSD radix sort).
