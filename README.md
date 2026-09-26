# ts-ds 📚

A powerful, convenient and lightweight library of data structures and algorithms in TypeScript.

## 🎯 Description

This library provides optimized implementations of popular data structures and algorithms that every developer needs. Written in TypeScript with full type support.

## 📦 Installation

```bash
npm install ts-ds
```

## 🚀 Usage

```typescript
import { quickSort, sort } from 'ts-ds';

const numbers = [64, 34, 25, 12, 22, 11, 90];
quickSort(numbers); // sorts in place and returns the same array
console.log(numbers); // [11, 12, 22, 25, 34, 64, 90]

// Custom order, any element type
const people = [
  { name: 'Ann', age: 30 },
  { name: 'Bob', age: 20 },
];
sort.merge(people, (a, b) => a.age - b.age); // merge sort is stable

// Descending order
sort.heap(numbers, (a, b) => b - a);
```

Every sorting function works like `Array.prototype.sort`: it sorts the array **in place**
and returns **the same array**. Copy the array first (`[...array]`) to keep the original.

## 📋 Implementation Checklist

### 🔹 Fundamental Data Structures

#### Stack

- [ ] `push(value)`
- [ ] `pop()`
- [ ] `peek()`
- [ ] `isEmpty()`
- [ ] `size()`
- [ ] `clear()`

#### Queue

- [ ] `enqueue(value)`
- [ ] `dequeue()`
- [ ] `front()`
- [ ] `isEmpty()`
- [ ] `size()`
- [ ] `clear()`

#### LinkedList

- [ ] `add(value)` / `append(value)`
- [ ] `insertAt(index, value)`
- [ ] `removeAt(index)`
- [ ] `remove(value)`
- [ ] `get(index)`
- [ ] `indexOf(value)`
- [ ] `contains(value)`
- [ ] `size()`
- [ ] `clear()`
- [ ] `toArray()`

#### DoublyLinkedList

- [ ] `add(value)`
- [ ] `insertAt(index, value)`
- [ ] `remove(value)`
- [ ] `get(index)`
- [ ] `reverse()`

### 📊 Hash-based and Set Structures

#### HashMap / Dictionary

- [ ] `set(key, value)`
- [ ] `get(key)`
- [ ] `has(key)` / `containsKey(key)`
- [ ] `delete(key)`
- [ ] `keys()`
- [ ] `values()`
- [ ] `entries()`
- [ ] `size()`
- [ ] `clear()`

#### HashSet

- [ ] `add(value)`
- [ ] `has(value)`
- [ ] `delete(value)`
- [ ] `size()`
- [ ] `clear()`
- [ ] `toArray()`
- [ ] `union(otherSet)`
- [ ] `intersection(otherSet)`
- [ ] `difference(otherSet)`

### ⚙️ Heap and Priority Structures

#### Heap (Min/Max)

- [ ] `push(value)` / `insert(value)`
- [ ] `pop()` / `extractMin/Max()`
- [ ] `peek()`
- [ ] `size()`
- [ ] `isEmpty()`
- [ ] `heapify()`

### 🌳 Tree Data Structures

#### Binary Search Tree (BST)

- [ ] `insert(value)`
- [ ] `delete(value)`
- [ ] `search(value)` / `contains(value)`
- [ ] `inOrder()`
- [ ] `preOrder()`
- [ ] `postOrder()`
- [ ] `findMin()`
- [ ] `findMax()`
- [ ] `height()`
- [ ] `isBalanced()`

#### AVL Tree

- [ ] `insert(value)`
- [ ] `delete(value)`
- [ ] `search(value)`
- [ ] `getBalance(node)`

#### Trie

- [ ] `insert(word)`
- [ ] `search(word)`
- [ ] `startsWith(prefix)`
- [ ] `delete(word)`
- [ ] `getAllWords()`

### 🕸️ Graph Structures

#### Graph (Undirected & Directed)

- [ ] `addVertex(value)`
- [ ] `addEdge(from, to, weight?)`
- [ ] `removeVertex(value)`
- [ ] `removeEdge(from, to)`
- [ ] `getVertices()`
- [ ] `getNeighbors(vertex)`
- [ ] `hasVertex(value)`
- [ ] `hasEdge(from, to)`

#### Graph Algorithms

- [ ] `bfs(start)`
- [ ] `dfs(start)`
- [ ] `dijkstra(start)`
- [ ] `bellmanFord(start)`
- [ ] `floydWarshall()`
- [ ] `topologicalSort()`
- [ ] `kruskal()`
- [ ] `prim()`

### 🔀 Sorting and Searching Algorithms

| Algorithm | Function                           | Best       | Average      | Worst      | Memory   | Stable |
| --------- | ---------------------------------- | ---------- | ------------ | ---------- | -------- | ------ |
| Bubble    | `bubbleSort` / `sort.bubble`       | O(n)       | O(n²)        | O(n²)      | O(1)     | yes    |
| Selection | `selectionSort` / `sort.selection` | O(n²)      | O(n²)        | O(n²)      | O(1)     | no     |
| Insertion | `insertionSort` / `sort.insertion` | O(n)       | O(n²)        | O(n²)      | O(1)     | yes    |
| Shell     | `shellSort` / `sort.shell`         | O(n log n) | ≈ O(n^(5/4)) | O(n^(3/2)) | O(1)     | no     |
| Merge     | `mergeSort` / `sort.merge`         | O(n)       | O(n log n)   | O(n log n) | O(n)     | yes    |
| Quick     | `quickSort` / `sort.quick`         | O(n log n) | O(n log n)   | O(n²)      | O(log n) | no     |
| Heap      | `heapSort` / `sort.heap`           | O(n log n) | O(n log n)   | O(n log n) | O(1)     | no     |
| Counting  | `countingSort` / `sort.counting`   | O(n + k)   | O(n + k)     | O(n + k)   | O(n + k) | yes    |
| Radix     | `radixSort` / `sort.radix`         | O(d(n+10)) | O(d(n+10))   | O(d(n+10)) | O(n)     | yes    |

- Comparison sorts take an optional `compareFn(a, b)` like `Array.prototype.sort`. The default
  order is ascending; strings are compared by UTF-16 code units, `NaN` goes to the end.
- Counting and radix sort work with integers only (negative values are allowed) and throw a
  `TypeError` otherwise. `k` is `max - min + 1`, `d` is the number of decimal digits.
- Each function's JSDoc explains the idea of the algorithm and the implementation details.

#### Searching Algorithms

- [ ] `linearSearch(arr, value)`
- [ ] `binarySearch(arr, value)`
- [ ] `interpolationSearch(arr, value)`
- [ ] `exponentialSearch(arr, value)`

## 📄 License

MIT

## 👤 Author

Andrei Pliukhaev

---

## 👨‍💻 For Developers

### Setup

Requires Node.js 24 (see [`.nvmrc`](.nvmrc)).

```bash
git clone https://github.com/pluhsoft/ts-ds.git
cd ts-ds
git switch develop
npm ci
```

### Scripts

```bash
npm run build          # compile to build/
npm test               # run tests once
npm run test:watch     # run tests in watch mode
npm run test:coverage  # tests with coverage report
npm run typecheck      # TypeScript without emitting files
npm run format         # format with Prettier
```

### Project Structure

```
src/
├── index.ts            # Main entry point
└── sort/
    ├── index.ts        # sort namespace
    ├── utils.ts        # compare and swap helpers
    ├── sort.test.ts    # shared tests for all algorithms
    └── <algorithm>/
        ├── <algorithm>.ts
        └── <algorithm>.test.ts
```

### Contributing and releases

Development follows Git Flow: `feature/*` → `develop` → `release/X.Y.Z` → `main` → npm.
See [CONTRIBUTING.md](CONTRIBUTING.md) for the full process and [CHANGELOG.md](CHANGELOG.md) for changes.
