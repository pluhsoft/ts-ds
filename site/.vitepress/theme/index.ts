import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import SortRace from './components/SortRace.vue';
import SortVisualizer from './components/SortVisualizer.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SortVisualizer', SortVisualizer);
    app.component('SortRace', SortRace);
  },
} satisfies Theme;
