# Getting started

## Installation

```bash
npm install ts-ds
```

The package has no dependencies. It works in Node.js 18+ and in any bundler, with ES modules and
CommonJS.

## Your first sort

```ts
import { quickSort } from 'ts-ds';

const numbers = [5, 2, 4, 6, 1, 3];
quickSort(numbers);
console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

::: warning Sorting changes the array
Every sorting function sorts the array **in place** and returns nothing (`void`). This is the same
convention as `list.sort()` in Python or `Arrays.sort()` in Java: a function either changes data or
returns a result, never both ([command–query separation](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation)).

```ts
const sorted = quickSort(numbers); // TypeScript error: quickSort returns void
```

To keep the original array, sort a copy:

```ts
const copy = [...numbers];
quickSort(copy);
```

:::

## Custom order

Comparison sorts take an optional comparator, exactly like `Array.prototype.sort`: it returns a
negative number if `a` goes first, a positive number if `b` goes first, and `0` if they are equal.

```ts
import { mergeSort } from 'ts-ds';

const people = [
  { name: 'Ann', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Eve', age: 30 },
];

mergeSort(people, (a, b) => a.age - b.age);
// Bob (20), Ann (30), Eve (30) — merge sort is stable, so Ann stays before Eve

mergeSort(people, (a, b) => b.age - a.age); // descending
```

Without a comparator values are sorted in ascending order with `<`. Strings are compared by UTF-16
code units (`'B' < 'a'`); use `(a, b) => a.localeCompare(b)` for alphabetical order. `NaN` goes to
the end.

## Ways to import

```ts
import { quickSort, heapSort } from 'ts-ds'; // named functions
import { sort } from 'ts-ds'; // all algorithms: sort.quick, sort.heap, …
import { quickSort } from 'ts-ds/sort'; // sorting only
const { quickSort } = require('ts-ds'); // CommonJS
```

Named imports let bundlers drop the algorithms you don't use. The `sort` object is convenient for
experiments and comparisons, but always includes every algorithm.

## Next steps

- [Sorting: overview and comparison](/sorting/) — which algorithm to choose and why.
- [API reference](/api/) — every function and type.
