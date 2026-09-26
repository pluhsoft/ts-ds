import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import SortVisualizer from './components/SortVisualizer.vue';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SortVisualizer', SortVisualizer);
  },
} satisfies Theme;
