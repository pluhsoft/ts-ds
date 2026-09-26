# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.0] - 2026-09-26

### Added

- Searching: `linearSearch`, `binarySearch`, `exponentialSearch`, `interpolationSearch` (first
  occurrence or -1), `lowerBound`, `upperBound`, the `search` object, `searchingAlgorithms` and
  `traceSearch`; `ts-ds/search` entry point; documentation page with a visualizer (English) (#51).
- Visualizer: the pseudocode of the algorithm with the line being executed highlighted, and a race
  mode that runs two algorithms side by side on the same data (#67).
- Interactive visualizer on the documentation site: bars, play/pause, step forward and back, a
  timeline, speed, random / nearly sorted / reversed / few-unique / your own data, live counters of
  comparisons, swaps and writes, in four languages. A dedicated page and a "Try it" block with the
  worked example on every algorithm page (#50).
- `trace(algorithm, array)` records every comparison, swap and write of a sorting algorithm without
  changing it, with counters of comparisons, reads, writes and swaps; `replay(input, steps, count)`
  rebuilds the array after any step. Available from `ts-ds` and `ts-ds/trace` (#48).
- `sortingAlgorithms`: name, kind, complexity, memory, stability and in-place flag of every sorting
  algorithm. The test suite checks the stability flags against the real behaviour (#48).
- Documentation page "Tracing and metadata" in all four languages (#48).

### Fixed

- `trace` no longer reports two consecutive writes as a swap when the algorithm had read more than
  the two exchanged positions (e.g. radix sort writing its result back) (#67).

## [2.0.1] - 2026-09-26

### Added

- Documentation site at https://pluhsoft.github.io/ts-ds/ in English, Russian, European Portuguese
  and Spanish: a page for every sorting algorithm with the idea, a worked example, pseudocode,
  complexity analysis and literature, plus an API reference generated from JSDoc (#49).

## [2.0.0] - 2026-09-26

Sorting algorithms are rewritten as described in CLRS and Sedgewick, and the package now ships
ES modules and CommonJS.

### Breaking changes

- All sorting functions sort **in place and return nothing** (`void`), following command–query
  separation like `list.sort()` in Python and `Arrays.sort()` in Java. `mergeSort`, `countingSort`
  and `radixSort` used to return a new array and leave the input unchanged; `quickSort` returned
  the same array (#46).
- `countingSort` and `radixSort` throw a `TypeError` for values that are not integers
  (radix sort used to return a wrongly ordered array, counting sort crashed) (#46).
- `countingSort` throws a `RangeError` when `max - min + 1` exceeds `COUNTING_SORT_MAX_RANGE` (2²⁶)
  instead of running out of memory (#46).
- The package is an ES module (`"type": "module"`) with an `exports` map: only `ts-ds`,
  `ts-ds/sort` and `ts-ds/package.json` can be imported; deep imports like `ts-ds/build/...` no
  longer work. CommonJS `require('ts-ds')` keeps working (#47).

#### Upgrading from 1.x

```typescript
// 1.x
const sorted = sort.merge(data);

// 2.0: sort a copy if the original must stay unchanged
const sorted = [...data];
sort.merge(sorted);
```

### Fixed

- Quick sort no longer overflows the call stack on sorted, reversed or equal input: Hoare
  partitioning, median-of-three pivot and recursion into the smaller part (#46).
- Counting and radix sort work on arrays of any length (no more `Math.min(...array)` stack
  overflow) (#46).
- The default comparator puts `NaN` at the end instead of producing an unsorted array (#46).

### Added

- Named exports for every algorithm (`import { quickSort } from 'ts-ds'`), `defaultCompare`,
  `CompareFn`, `COUNTING_SORT_MAX_RANGE` (#46).
- ES modules and CommonJS builds with types for both, `ts-ds/sort` subpath, `sideEffects: false`
  for tree-shaking, `engines.node >= 18` (#47).

### Changed

- Shell sort uses Knuth's gap sequence (1, 4, 13, 40, …) with a proven O(n^(3/2)) worst case (#46).
- Merge sort follows CLRS: merges back into the array and skips the merge when halves are already
  in order (#46).
- Every algorithm documents its idea, complexity, memory and stability in JSDoc (#46).
- The published package contains only the build output and has no runtime dependencies (#38).

### Development

- Git Flow release process: `develop` → `release/X.Y.Z` → `main` → npm with provenance, automatic
  tag, GitHub release and backmerge into `develop`; version policy checked in CI (#38).
- Shared test suite for all algorithms with property-based tests (fast-check), 100% coverage,
  type-checked tests (#46).
- CI checks the package with publint and arethetypeswrong and installs the packed tarball into an
  empty project to use it via `require`, `import` and TypeScript (#47).
- Node.js 24, TypeScript 7, Vitest 5; GitHub Actions pinned by commit SHA; Dependabot (#38).

## [1.0.32] - 2026-05-02

Last version published by the previous automatic release process.
