<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { searchingAlgorithms, traceSearch } from 'ts-ds';
import SortBars from './SortBars.vue';

const algorithmId = ref('binary');
const size = ref(24);
// Fixed data for the server render; random data is generated after mounting.
const array = ref<number[]>(Array.from({ length: size.value }, (_, i) => 3 * i + 2));
const target = ref(array.value[15]);
const current = ref(0);
const playing = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const algorithm = computed(
  () => searchingAlgorithms.find((a) => a.id === algorithmId.value) ?? searchingAlgorithms[1],
);
const run = computed(() => traceSearch(algorithm.value.search, array.value, target.value));
const steps = computed(() => run.value.steps);
const finished = computed(() => current.value >= steps.value.length);
const shown = computed(() => steps.value.slice(0, current.value));
const probes = computed(() =>
  shown.value.flatMap((step) => (step.type === 'probe' ? [step.index] : [])),
);
const lastProbe = computed(() => probes.value[probes.value.length - 1]);

const description = computed(() => {
  const step = shown.value[shown.value.length - 1];
  if (finished.value && current.value > 0) {
    return run.value.result === -1
      ? `${target.value} is not in the array.`
      : `Found ${target.value} at index ${run.value.result}.`;
  }
  if (!step) return 'Press Play or step forward to start.';
  if (step.type === 'probe') return `Look at A[${step.index}] = ${step.value}`;
  const [a, b] = step.values;
  const sign = step.result < 0 ? '<' : step.result > 0 ? '>' : '=';
  return `Compare ${a} with ${b}: ${a} ${sign} ${b}`;
});

function stop(): void {
  playing.value = false;
  clearTimeout(timer);
}

function tick(): void {
  if (finished.value) return stop();
  current.value += 1;
  timer = setTimeout(tick, 400);
}

function togglePlay(): void {
  if (playing.value) return stop();
  if (finished.value) current.value = 0;
  playing.value = true;
  tick();
}

function stepForward(): void {
  stop();
  if (!finished.value) current.value += 1;
}

function reset(): void {
  stop();
  current.value = 0;
}

function newArray(): void {
  stop();
  const values = new Set<number>();
  while (values.size < size.value) values.add(1 + Math.floor(Math.random() * size.value * 4));
  array.value = [...values].sort((a, b) => a - b);
  target.value = array.value[Math.floor(Math.random() * size.value)];
  current.value = 0;
}

watch([algorithmId, target], reset);
watch(size, newArray);
onMounted(newArray);
onBeforeUnmount(stop);
</script>

<template>
  <div class="search-visualizer">
    <div class="controls">
      <label>
        Algorithm
        <select v-model="algorithmId">
          <option v-for="a in searchingAlgorithms" :key="a.id" :value="a.id">{{ a.name }}</option>
        </select>
      </label>
      <label>
        Target
        <input v-model.number="target" type="number" />
      </label>
      <label>
        Size: {{ size }}
        <input v-model.number="size" type="range" min="8" max="60" />
      </label>
      <button type="button" @click="newArray">New array</button>
    </div>

    <SortBars
      class="bars"
      :array="array"
      :compared="lastProbe === undefined || finished ? [] : [lastProbe]"
      :visited="probes"
      :found="finished && run.result >= 0 ? [run.result] : []"
      :height="180"
    />

    <p class="description" aria-live="polite">{{ description }}</p>

    <div class="player">
      <button type="button" aria-label="Reset" title="Reset" @click="reset">⏮</button>
      <button type="button" class="play" @click="togglePlay">
        {{ playing ? 'Pause' : 'Play' }}
      </button>
      <button type="button" aria-label="Step forward" title="Step forward" @click="stepForward">
        ▶
      </button>
      <span class="counter">
        Probes <b>{{ probes.length }}</b> · Comparisons
        <b>{{ shown.filter((s) => s.type === 'compare').length }}</b>
      </span>
    </div>
  </div>
</template>

<style scoped>
.search-visualizer {
  margin: 16px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.controls,
.player {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px 16px;
}
.controls label {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
select,
input[type='number'],
button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}
input[type='number'] {
  width: 90px;
}
.play {
  min-width: 80px;
  background: var(--vp-button-brand-bg);
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
}
.bars {
  margin-top: 16px;
}
.description {
  min-height: 1.6em;
  margin: 8px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}
.counter {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
