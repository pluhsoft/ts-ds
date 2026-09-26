# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Breaking changes

- The package is an ES module (`"type": "module"`) with an `exports` map: only `ts-ds`,
  `ts-ds/sort` and `ts-ds/package.json` can be imported; deep imports like `ts-ds/build/...` no
  longer work. CommonJS `require('ts-ds')` keeps working (#47).

- All sorting functions sort **in place and return nothing** (`void`), following command–query
  separation like `list.sort()` in Python and `Arrays.sort()` in Java. `mergeSort`, `countingSort`
  and `radixSort` used to return a new array and leave the input unchanged; `quickSort` returned
  the same array (#46).
- `countingSort` and `radixSort` throw a `TypeError` for values that are not integers
  (radix sort used to return a wrongly ordered array, counting sort crashed) (#46).
- `countingSort` throws a `RangeError` when `max - min + 1` exceeds `COUNTING_SORT_MAX_RANGE` (2²⁶)
  instead of running out of memory (#46).

### Fixed

- Quick sort no longer overflows the call stack on sorted, reversed or equal input: Hoare
  partitioning, median-of-three pivot and recursion into the smaller part (#46).
- Counting and radix sort work on arrays of any length (no more `Math.min(...array)` stack overflow) (#46).
- The default comparator puts `NaN` at the end instead of producing an unsorted array (#46).

### Changed

- Shell sort uses Knuth's gap sequence (1, 4, 13, 40, …) with a proven O(n^(3/2)) worst case (#46).
- Merge sort follows CLRS: merges back into the array and skips the merge when halves are already in order (#46).
- Every algorithm documents its idea, complexity, memory and stability in JSDoc (#46).

### Added

- ES modules and CommonJS builds with an `exports` map and types for both; `ts-ds/sort` subpath;
  `sideEffects: false` for tree-shaking; `engines.node >= 18` (#47).
- CI checks the package with publint and arethetypeswrong and installs the packed tarball into an
  empty project to use it via `require`, `import` and TypeScript (#47).

- Named exports for every algorithm (`import { quickSort } from 'ts-ds'`), `defaultCompare`, `CompareFn` (#46).
- Shared test suite for all algorithms with property-based tests (fast-check) and 100% coverage (#46).
- `npm run typecheck` also checks the tests (`tsconfig.test.json`) (#46).

### Changed

- Release process moved to Git Flow: `develop` → `release/X.Y.Z` → `main` → npm, with an automatic backmerge into `develop` (#38).
- The published package contains only the build output; it has no runtime dependencies.
- Node.js 24 and current versions of TypeScript, Vitest and Prettier are used for development.

## [1.0.32] - 2026-05-02

Last version published by the previous automatic release process.
