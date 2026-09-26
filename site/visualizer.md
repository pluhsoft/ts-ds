# Visualizer

Choose an algorithm and data, then press **Play** or go step by step. The highlighted line of the
pseudocode is the one being executed. Yellow bars are being
compared, red ones have just changed. The counters show how much work the algorithm has done so far
— compare them for different algorithms on the same data.

<ClientOnly>
  <SortVisualizer />
</ClientOnly>

## Race

Two algorithms on the same data, step for step. Try quick sort against bubble sort on 60
elements — this is what O(n log n) versus O(n²) looks like.

<ClientOnly>
  <SortRace />
</ClientOnly>

Every step comes from the real library code, recorded with [`trace`](./guide/tracing).
