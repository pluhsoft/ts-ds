<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { replay, sortingAlgorithms, trace, type Step } from 'ts-ds';
import { textFor } from './i18n';
import { makeInput, type InputKind } from './inputs';
import SortBars from './SortBars.vue';

const { lang } = useData();
const t = computed(() => textFor(lang.value));

const ids = ref<[string, string]>(['bubble', 'quick']);
const inputKind = ref<InputKind>('random');
const size = ref(30);
const speed = ref(6);
// Fixed data for the server render; random data is generated after mounting.
const input = ref<number[]>(Array.from({ length: size.value }, (_, i) => size.value - i));
const current = ref(0);
const playing = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

// Traced once per algorithm and input; every frame only replays the recorded steps.
const traces = computed(() =>
  ids.value.map((id) => {
    const algorithm = sortingAlgorithms.find((a) => a.id === id) ?? sortingAlgorithms[0];
    return {
      algorithm,
      steps: trace(algorithm.sort as (array: number[]) => void, input.value).steps,
    };
  }),
);

const lanes = computed(() =>
  traces.value.map(({ algorithm, steps }) => {
    const shown = Math.min(current.value, steps.length);
    const last: Step<number> | undefined = steps[shown - 1];
    const counts = { comparisons: 0, swaps: 0, writes: 0 };
    for (const step of steps.slice(0, shown)) {
      if (step.type === 'compare') counts.comparisons += 1;
      else if (step.type === 'swap') counts.swaps += 1;
      else counts.writes += 1;
    }
    return {
      name: t.value.names[algorithm.id] ?? algorithm.name,
      total: steps.length,
      shown,
      done: shown === steps.length && current.value > 0,
      array: replay(input.value, steps, shown),
      compared: last?.type === 'compare' ? last.indices : [],
      changed:
        last?.type === 'swap' ? [last.i, last.j] : last?.type === 'write' ? [last.index] : [],
      counts,
    };
  }),
);
const longest = computed(() => Math.max(...lanes.value.map((lane) => lane.total)));

function stop(): void {
  playing.value = false;
  clearTimeout(timer);
}

function tick(): void {
  if (current.value >= longest.value) {
    stop();
    return;
  }
  current.value += 1;
  timer = setTimeout(tick, 1000 / (speed.value * speed.value));
}

function togglePlay(): void {
  if (playing.value) {
    stop();
    return;
  }
  if (current.value >= longest.value) current.value = 0;
  playing.value = true;
  tick();
}

function reset(): void {
  stop();
  current.value = 0;
}

function newInput(): void {
  stop();
  input.value = makeInput(inputKind.value, size.value);
  current.value = 0;
}

watch(ids, reset, { deep: true });
watch([inputKind, size], newInput);
onMounted(newInput);
onBeforeUnmount(stop);
</script>

<template>
  <div class="sort-race">
    <div class="controls">
      <label v-for="(label, lane) in [t.first, t.second]" :key="lane">
        {{ label }}
        <select v-model="ids[lane]">
          <option v-for="a in sortingAlgorithms" :key="a.id" :value="a.id">
            {{ t.names[a.id] ?? a.name }}
          </option>
        </select>
      </label>
      <label>
        {{ t.input }}
        <select v-model="inputKind">
          <option value="random">{{ t.random }}</option>
          <option value="nearlySorted">{{ t.nearlySorted }}</option>
          <option value="reversed">{{ t.reversed }}</option>
          <option value="fewUnique">{{ t.fewUnique }}</option>
        </select>
      </label>
      <label>
        {{ t.size }}: {{ size }}
        <input v-model.number="size" type="range" min="4" max="60" />
      </label>
      <label>
        {{ t.speed }}
        <input v-model.number="speed" type="range" min="1" max="10" />
      </label>
    </div>

    <div class="lanes">
      <section v-for="(lane, index) in lanes" :key="index" class="lane">
        <h4>{{ lane.name }}</h4>
        <SortBars
          :array="lane.array"
          :compared="lane.compared"
          :changed="lane.changed"
          :done="lane.done"
          :height="140"
        />
        <p class="status" :class="{ done: lane.done }">
          <template v-if="lane.done">{{ t.finishedIn(lane.total) }}</template>
          <template v-else>{{ t.step }} {{ lane.shown }} {{ t.of }} {{ lane.total }}</template>
        </p>
        <p class="counts">
          {{ t.comparisons }} <b>{{ lane.counts.comparisons }}</b> · {{ t.swaps }}
          <b>{{ lane.counts.swaps }}</b> · {{ t.writes }} <b>{{ lane.counts.writes }}</b>
        </p>
      </section>
    </div>

    <div class="player">
      <button type="button" :aria-label="t.reset" :title="t.reset" @click="reset">⏮</button>
      <button type="button" class="play" @click="togglePlay">
        {{ playing ? t.pause : t.play }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.sort-race {
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
  align-items: center;
  gap: 8px 16px;
}
.controls label {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
select,
button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}
.play {
  min-width: 80px;
  background: var(--vp-button-brand-bg);
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
}
.lanes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin: 16px 0;
}
@media (max-width: 640px) {
  .lanes {
    grid-template-columns: minmax(0, 1fr);
  }
}
.lane h4 {
  margin: 0 0 8px;
  font-size: 15px;
}
.status,
.counts {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.status.done {
  color: var(--ts-ds-done);
  font-weight: 600;
}
</style>
