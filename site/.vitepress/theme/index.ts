import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import SearchVisualizer from './components/SearchVisualizer.vue';
import SortRace from './components/SortRace.vue';
import SortVisualizer from './components/SortVisualizer.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SortVisualizer', SortVisualizer);
    app.component('SortRace', SortRace);
    app.component('SearchVisualizer', SearchVisualizer);
  },
} satisfies Theme;
