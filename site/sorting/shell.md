# Shell sort

## Idea

Insertion sort is slow because an element moves only one position per shift. Donald Shell (1959)
proposed to first sort elements that are far apart: sort every `h`-th element (the array becomes
"h-sorted"), then use a smaller `h`, and finish with `h = 1` — plain insertion sort, which is now
fast because every element is already close to its place.

This implementation uses **Knuth's gap sequence** 1, 4, 13, 40, 121, … (`h = 3h + 1`), starting
from the largest gap below n/3.

## Example

Sorting `[9, 8, 3, 7, 5, 6, 4, 1, 2, 0]` (n = 10, gaps 4 and 1).

**Gap 4** — four independent insertion sorts over positions `{0, 4, 8}`, `{1, 5, 9}`, `{2, 6}`,
`{3, 7}`:

| Group   | Before  | After   |
| ------- | ------- | ------- |
| 0, 4, 8 | 9, 5, 2 | 2, 5, 9 |
| 1, 5, 9 | 8, 6, 0 | 0, 6, 8 |
| 2, 6    | 3, 4    | 3, 4    |
| 3, 7    | 7, 1    | 1, 7    |

Array: `2, 0, 3, 1, 5, 6, 4, 7, 9, 8` — every element is at most a few positions from its place.

**Gap 1** — insertion sort finishes with only 6 shifts (the 6 remaining inversions): `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`.

## Pseudocode

```text
SHELL-SORT(A)
  h = 1
  while h < ⌊n / 3⌋
    h = 3h + 1
  while h ≥ 1
    for i = h to n − 1            // insertion sort with step h
      key = A[i]
      j = i
      while j ≥ h and A[j − h] > key
        A[j] = A[j − h]
        j = j − h
      A[j] = key
    h = (h − 1) / 3
```

## Complexity

| Best       | Average     | Worst    | Memory | Stable | In place |
| ---------- | ----------- | -------- | ------ | ------ | -------- |
| O(n log n) | ≈ O(n^1.25) | O(n^1.5) | O(1)   | no     | yes      |

- The complexity depends on the gap sequence and is still an open research problem. For Knuth's
  sequence the worst case O(n^(3/2)) is proven (Pratt, 1971); the average is observed around
  n^1.25.
- Shell's original sequence n/2, n/4, …, 1 is worse: O(n²) in the worst case.
- **Not stable**: long jumps can move an element past an equal one.

## When to use

When you need something much faster than O(n²) sorts but simple, without recursion and without
extra memory — e.g. in embedded code. For large arrays O(n log n) algorithms win.

## Usage

```ts
import { shellSort } from 'ts-ds';

const array = [9, 8, 3, 7, 5, 6, 4, 1, 2, 0];
shellSort(array);
```

[API reference](/api/functions/shellSort)

## Literature

- D. L. Shell. "A high-speed sorting procedure". _Communications of the ACM_ 2(7), 1959.
- Knuth, _TAOCP_ Vol. 3, §5.2.1 "Shell's method".
- Sedgewick, _Algorithms_, §2.1.
