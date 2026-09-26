<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { replay, sortingAlgorithms, trace, type Step, type Trace } from 'ts-ds';
import { textFor } from './i18n';
import { makeInput, parseInput, type InputKind } from './inputs';

const props = withDefaults(
  defineProps<{
    /** Show only this algorithm (its id, e.g. "quick") and hide the selector. */
    algorithm?: string;
    /** Initial numbers; random data by default. */
    input?: number[];
  }>(),
  { algorithm: undefined, input: undefined },
);

const { lang } = useData();
const t = computed(() => textFor(lang.value));

const algorithmId = ref(props.algorithm ?? 'bubble');
const inputKind = ref<InputKind | 'example'>(props.input ? 'example' : 'random');
const size = ref(props.input?.length ?? 16);
const speed = ref(5);
const customText = ref('');
const invalid = ref(false);

// The server render uses fixed data (the CLRS example repeated); random data is generated in the
// browser after mounting, so the server and client markup match.
const input = ref<number[]>(
  props.input ?? Array.from({ length: size.value }, (_, i) => [5, 2, 4, 6, 1, 3][i % 6] + i),
);
let keepCustomInput = false;
const current = ref(0);
const playing = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const algorithm = computed(
  () => sortingAlgorithms.find((a) => a.id === algorithmId.value) ?? sortingAlgorithms[0],
);
const run = computed<Trace<number>>(() =>
  trace(algorithm.value.sort as (array: number[]) => void, input.value),
);
const steps = computed(() => run.value.steps);
const array = computed(() => replay(input.value, steps.value, current.value));
const lastStep = computed<Step<number> | undefined>(() => steps.value[current.value - 1]);
const finished = computed(() => current.value >= steps.value.length);

const stats = computed(() => {
  let comparisons = 0;
  let swaps = 0;
  let writes = 0;
  for (const step of steps.value.slice(0, current.value)) {
    if (step.type === 'compare') comparisons += 1;
    else if (step.type === 'swap') swaps += 1;
    else writes += 1;
  }
  return { comparisons, swaps, writes };
});

const highlighted = computed(() => {
  const step = lastStep.value;
  const compared = new Set<number>();
  const changed = new Set<number>();
  if (step?.type === 'compare') step.indices.forEach((i) => compared.add(i));
  if (step?.type === 'swap') [step.i, step.j].forEach((i) => changed.add(i));
  if (step?.type === 'write') changed.add(step.index);
  return { compared, changed };
});

const description = computed(() => {
  const step = lastStep.value;
  if (!step) return t.value.start;
  if (step.type === 'compare') {
    const sign = step.result < 0 ? '<' : step.result > 0 ? '>' : '=';
    const [a, b] = step.values;
    return t.value.compare(String(a), String(b), `${a} ${sign} ${b}`);
  }
  if (step.type === 'swap') return t.value.swap(step.i, step.j);
  return t.value.write(String(step.value), step.index);
});

const bounds = computed(() => {
  const min = Math.min(0, ...input.value);
  const max = Math.max(1, ...input.value);
  return { min, max };
});

function barHeight(value: number): number {
  const { min, max } = bounds.value;
  return 4 + ((value - min) / (max - min || 1)) * 96;
}

function barClass(index: number): string {
  if (finished.value && current.value > 0) return 'bar done';
  if (highlighted.value.changed.has(index)) return 'bar changed';
  if (highlighted.value.compared.has(index)) return 'bar compared';
  return 'bar';
}

function stop(): void {
  playing.value = false;
  clearTimeout(timer);
}

function tick(): void {
  if (finished.value) {
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
  if (finished.value) current.value = 0;
  playing.value = true;
  tick();
}

function stepForward(): void {
  stop();
  if (!finished.value) current.value += 1;
}

function stepBack(): void {
  stop();
  if (current.value > 0) current.value -= 1;
}

function reset(): void {
  stop();
  current.value = 0;
}

function newInput(): void {
  if (keepCustomInput) {
    keepCustomInput = false;
    return;
  }
  stop();
  input.value =
    inputKind.value === 'example' && props.input
      ? [...props.input]
      : makeInput(inputKind.value === 'example' ? 'random' : inputKind.value, size.value);
  current.value = 0;
}

function applyCustom(): void {
  const values = parseInput(customText.value);
  invalid.value = values === null;
  if (values) {
    stop();
    keepCustomInput = values.length !== size.value;
    input.value = values;
    size.value = values.length;
    current.value = 0;
  }
}

watch(algorithmId, reset);
watch([inputKind, size], newInput);
onMounted(() => {
  if (!props.input) newInput();
});
onBeforeUnmount(stop);
</script>

<template>
  <div class="sort-visualizer">
    <div class="controls">
      <label v-if="!props.algorithm">
        {{ t.algorithm }}
        <select v-model="algorithmId">
          <option v-for="a in sortingAlgorithms" :key="a.id" :value="a.id">
            {{ t.names[a.id] ?? a.name }}
          </option>
        </select>
      </label>
      <label>
        {{ t.input }}
        <select v-model="inputKind">
          <option v-if="props.input" value="example">{{ t.example }}</option>
          <option value="random">{{ t.random }}</option>
          <option value="nearlySorted">{{ t.nearlySorted }}</option>
          <option value="reversed">{{ t.reversed }}</option>
          <option value="fewUnique">{{ t.fewUnique }}</option>
        </select>
      </label>
      <label v-if="inputKind !== 'example'">
        {{ t.size }}: {{ size }}
        <input v-model.number="size" type="range" min="4" max="60" />
      </label>
      <label>
        {{ t.speed }}
        <input v-model.number="speed" type="range" min="1" max="10" />
      </label>
    </div>

    <form class="custom" @submit.prevent="applyCustom">
      <label>
        {{ t.custom }}
        <input
          v-model="customText"
          type="text"
          :placeholder="t.customPlaceholder"
          :aria-invalid="invalid"
        />
      </label>
      <button type="submit">{{ t.apply }}</button>
      <span v-if="invalid" class="error">{{ t.invalidInput }}</span>
    </form>

    <svg
      class="bars"
      :viewBox="`0 0 ${array.length * 10} 100`"
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

    <p class="description" aria-live="polite">
      {{ finished && current > 0 ? t.done : description }}
    </p>

    <div class="player">
      <button type="button" :aria-label="t.reset" :title="t.reset" @click="reset">⏮</button>
      <button type="button" :aria-label="t.stepBack" :title="t.stepBack" @click="stepBack">
        ◀
      </button>
      <button type="button" class="play" @click="togglePlay">
        {{ playing ? t.pause : t.play }}
      </button>
      <button type="button" :aria-label="t.stepForward" :title="t.stepForward" @click="stepForward">
        ▶
      </button>
      <input
        v-model.number="current"
        class="timeline"
        type="range"
        min="0"
        :max="steps.length"
        :aria-label="t.step"
        @input="stop"
      />
      <span class="counter">{{ t.step }} {{ current }} {{ t.of }} {{ steps.length }}</span>
    </div>

    <dl class="stats">
      <div>
        <dt>{{ t.comparisons }}</dt>
        <dd>{{ stats.comparisons }}</dd>
      </div>
      <div>
        <dt>{{ t.swaps }}</dt>
        <dd>{{ stats.swaps }}</dd>
      </div>
      <div>
        <dt>{{ t.writes }}</dt>
        <dd>{{ stats.writes }}</dd>
      </div>
      <div class="legend">
        <span class="swatch compared" /> {{ t.legendCompare }} <span class="swatch changed" />
        {{ t.legendChange }}
      </div>
    </dl>
  </div>
</template>

<style scoped>
.sort-visualizer {
  --bar: var(--vp-c-brand-soft);
  --bar-stroke: var(--vp-c-brand-1);
  --bar-compared: #f5b400;
  --bar-changed: #e5484d;
  --bar-done: #30a46c;
  margin: 16px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.controls,
.custom,
.player,
.stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}
.controls label,
.custom label {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.custom {
  margin-top: 12px;
  align-items: flex-end;
}
.custom label {
  flex: 1;
  min-width: 180px;
}
select,
input[type='text'],
button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}
button:hover {
  border-color: var(--vp-c-brand-1);
}
.play {
  min-width: 80px;
  background: var(--vp-button-brand-bg);
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
}
.play:hover {
  background: var(--vp-button-brand-hover-bg);
}
.error {
  color: var(--vp-c-danger-1);
  font-size: 13px;
}
.bars {
  display: block;
  width: 100%;
  height: 220px;
  margin-top: 16px;
}
.bar {
  fill: var(--bar);
  stroke: var(--bar-stroke);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  transition:
    y 0.12s,
    height 0.12s;
}
.bar.compared {
  fill: var(--bar-compared);
}
.bar.changed {
  fill: var(--bar-changed);
}
.bar.done {
  fill: var(--bar-done);
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
.description {
  min-height: 1.6em;
  margin: 8px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
}
.timeline {
  flex: 1;
  min-width: 120px;
}
.counter {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.stats {
  margin: 12px 0 0;
}
.stats div {
  display: flex;
  gap: 6px;
}
.stats dt {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.stats dd {
  margin: 0;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.legend {
  margin-left: auto;
  align-items: center;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.swatch {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
.swatch.compared {
  background: var(--bar-compared);
}
.swatch.changed {
  background: var(--bar-changed);
}
@media (prefers-reduced-motion: reduce) {
  .bar {
    transition: none;
  }
}
</style>
