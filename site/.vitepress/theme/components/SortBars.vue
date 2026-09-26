<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  array: number[];
  compared?: number[];
  changed?: number[];
  done?: boolean;
  height?: number;
}>();

// The array is only permuted while sorting, so the scale stays the same on every step.
const bounds = computed(() => ({
  min: Math.min(0, ...props.array),
  max: Math.max(1, ...props.array),
}));

function barHeight(value: number): number {
  const { min, max } = bounds.value;
  return 4 + ((value - min) / (max - min || 1)) * 96;
}

function barClass(index: number): string {
  if (props.done) return 'bar done';
  if (props.changed?.includes(index)) return 'bar changed';
  if (props.compared?.includes(index)) return 'bar compared';
  return 'bar';
}
</script>

<template>
  <div class="sort-bars">
    <svg
      :viewBox="`0 0 ${array.length * 10} 100`"
      :style="{ height: `${height ?? 220}px` }"
      preserveAspectRatio="none"
      role="img"
      :aria-label="array.join(', ')"
    >
      <rect
        v-for="(value, index) in array"
        :key="index"
        :class="barClass(index)"
        :x="index * 10 + 1"
        :y="100 - barHeight(value)"
        width="8"
        :height="barHeight(value)"
      />
    </svg>
    <div v-if="array.length <= 20" class="values">
      <span v-for="(value, index) in array" :key="index">{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
svg {
  display: block;
  width: 100%;
}
.bar {
  fill: var(--ts-ds-bar);
  stroke: var(--ts-ds-bar-stroke);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  transition:
    y 0.12s,
    height 0.12s;
}
.bar.compared {
  fill: var(--ts-ds-compared);
}
.bar.changed {
  fill: var(--ts-ds-changed);
}
.bar.done {
  fill: var(--ts-ds-done);
}
.values {
  display: flex;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.values span {
  flex: 1;
  text-align: center;
}
@media (prefers-reduced-motion: reduce) {
  .bar {
    transition: none;
  }
}
</style>
