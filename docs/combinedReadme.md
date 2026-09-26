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
import { sort } from 'ts-ds';

const array = [64, 34, 25, 12, 22, 11, 90];
sort.selection(array);
console.log(array); // [11, 12, 22, 25, 34, 64, 90]
```

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

#### Selection Sort
- [x] `selectionSort(arr, compareFn?)`
- [x] `selectionSort` tests
<details>
<summary>Selection sort details</summary>

- `arr`: array to sort in place.
- `compareFn`: optional comparator returning negative, zero, or positive.
- `returns`: `void`.
- `sort.selection(array)` is an alias for `selectionSort(array)`.
- Selection sort finds the smallest element and swaps it to the beginning.

</details>

#### Bubble Sort
- [x] `bubbleSort(arr, compareFn?)`
- [x] `bubbleSort` optimized
<details>
<summary>Bubble sort details</summary>

- `arr`: array to sort in place.
- `compareFn`: optional comparator.
- `returns`: `void`.
- Bubble sort compares adjacent elements and swaps them until the array is sorted.
- The implementation stops early when no swaps occur on a pass.

</details>

#### Insertion Sort
- [x] `insertionSort(arr, compareFn?)`
<details>
<summary>Insertion sort details</summary>

- `arr`: array to sort in place.
- `compareFn`: optional comparator.
- `returns`: `void`.
- Insertion sort builds a sorted prefix by moving each element into its correct position.

</details>

#### Merge Sort
- [x] `mergeSort(arr, compareFn?)`
<details>
<summary>Merge sort details</summary>

- `arr`: array to sort.
- `compareFn`: optional comparator.
- `returns`: new sorted array.
- Merge sort divides the array, sorts both halves recursively, then merges them.

</details>

#### Quick Sort
- [x] `quickSort(arr, compareFn?)`
<details>
<summary>Quick sort details</summary>

- `arr`: array to sort in place.
- `compareFn`: optional comparator.
- `returns`: sorted array (same reference).
- Quick sort partitions by pivot and recursively sorts subarrays.

</details>

#### Heap Sort
- [x] `heapSort(arr, compareFn?)`
<details>
<summary>Heap sort details</summary>

- `arr`: array to sort in place.
- `compareFn`: optional comparator.
- `returns`: `void`.
- Heap sort uses a binary heap structure and repeatedly extracts the top element.

</details>

#### Counting Sort
- [x] `countingSort(arr)`
<details>
<summary>Counting sort details</summary>

- `arr`: array of numbers.
- `returns`: sorted number array.
- Counting sort counts value frequencies and rebuilds the result from counts.
- This implementation supports negative values.

</details>

#### Radix Sort
- [x] `radixSort(arr)`
<details>
<summary>Radix sort details</summary>

- `arr`: array of integers.
- `returns`: sorted number array.
- Radix sort sorts by digit positions, processing least significant digits first.
- The implementation handles negative numbers by sorting negatives separately.

</details>

#### Shell Sort
- [x] `shellSort(arr, compareFn?)`
<details>
<summary>Shell sort details</summary>

- `arr`: array to sort in place.
- `compareFn`: optional comparator.
- `returns`: `void`.
- Shell sort improves insertion sort by sorting elements at a gap distance.

</details>

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

1. Clone the repository
2. Install dependencies: `npm install`
3. Make sure TypeScript is installed

### Scripts

```bash
# Build project
npm run build

# Run tests
npm run test

# Watch for changes
npm run watch

# Format code
npm run format
```

### Project Structure

```
src/
├── index.ts          # Main entry point
├── index.test.ts     # Main tests
└── sort/
    ├── selection/
    │   ├── selection.ts
    │   ├── selection.test.ts
    │   └── README.md
    └── data.ts
```

### Development Guidelines

- Follow TypeScript best practices
- Write tests for all new features
- Use Prettier for code formatting
- Maintain comprehensive documentation
- Keep data structures generic using TypeScript generics

### Contributing

Feel free to submit issues and enhancement requests!

