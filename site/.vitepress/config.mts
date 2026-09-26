import { defineConfig, type DefaultTheme } from 'vitepress';
import apiSidebar from '../api/typedoc-sidebar.json' with { type: 'json' };

const algorithms = [
  'bubble',
  'selection',
  'insertion',
  'shell',
  'merge',
  'quick',
  'heap',
  'counting',
  'radix',
] as const;

const names: Record<(typeof algorithms)[number], string> = {
  bubble: 'Bubble sort',
  selection: 'Selection sort',
  insertion: 'Insertion sort',
  shell: 'Shell sort',
  merge: 'Merge sort',
  quick: 'Quick sort',
  heap: 'Heap sort',
  counting: 'Counting sort',
  radix: 'Radix sort',
};

interface Labels {
  ui?: UiLabels;
  guide: string;
  gettingStarted: string;
  tracing: string;
  sorting: string;
  overview: string;
  api: string;
  names?: Partial<typeof names>;
}

interface UiLabels {
  outline: string;
  prev: string;
  next: string;
  lastUpdated: string;
  editLink: string;
  returnToTop: string;
  menu: string;
  darkMode: string;
  language: string;
  search: string;
  noResults: string;
}

function sidebar(prefix: string, labels: Labels): DefaultTheme.SidebarItem[] {
  return [
    {
      text: labels.guide,
      items: [
        { text: labels.gettingStarted, link: `${prefix}/guide/getting-started` },
        { text: labels.tracing, link: `${prefix}/guide/tracing` },
      ],
    },
    {
      text: labels.sorting,
      items: [
        { text: labels.overview, link: `${prefix}/sorting/` },
        ...algorithms.map((id) => ({
          text: labels.names?.[id] ?? names[id],
          link: `${prefix}/sorting/${id}`,
        })),
      ],
    },
    { text: labels.api, link: '/api/', collapsed: true, items: apiSidebar },
  ];
}

function locale(
  prefix: string,
  lang: string,
  label: string,
  description: string,
  labels: Labels,
): DefaultTheme.Config & { lang: string; label: string; description: string } {
  return {
    lang,
    label,
    description,
    nav: [
      { text: labels.gettingStarted, link: `${prefix}/guide/getting-started` },
      { text: labels.sorting, link: `${prefix}/sorting/` },
      { text: labels.api, link: '/api/' },
    ],
    sidebar: sidebar(prefix, labels),
    ...(labels.ui && {
      outline: { label: labels.ui.outline },
      docFooter: { prev: labels.ui.prev, next: labels.ui.next },
      lastUpdated: { text: labels.ui.lastUpdated },
      editLink: {
        pattern: 'https://github.com/pluhsoft/ts-ds/edit/develop/site/:path',
        text: labels.ui.editLink,
      },
      returnToTopLabel: labels.ui.returnToTop,
      sidebarMenuLabel: labels.ui.menu,
      darkModeSwitchLabel: labels.ui.darkMode,
      langMenuLabel: labels.ui.language,
    }),
  };
}

function searchLocale(ui: UiLabels) {
  return {
    translations: {
      button: { buttonText: ui.search, buttonAriaLabel: ui.search },
      modal: { noResultsText: ui.noResults },
    },
  };
}

const en = locale('', 'en', 'English', 'Data structures and algorithms in TypeScript, explained.', {
  guide: 'Guide',
  gettingStarted: 'Getting started',
  tracing: 'Tracing and metadata',
  sorting: 'Sorting',
  overview: 'Overview and comparison',
  api: 'API reference',
});

const ruUi: UiLabels = {
  outline: 'На этой странице',
  prev: 'Предыдущая страница',
  next: 'Следующая страница',
  lastUpdated: 'Обновлено',
  editLink: 'Предложить правку на GitHub',
  returnToTop: 'Наверх',
  menu: 'Меню',
  darkMode: 'Оформление',
  language: 'Язык',
  search: 'Поиск',
  noResults: 'Ничего не найдено',
};

const ru = locale(
  '/ru',
  'ru',
  'Русский',
  'Структуры данных и алгоритмы на TypeScript с объяснениями.',
  {
    ui: ruUi,
    guide: 'Руководство',
    gettingStarted: 'Начало работы',
    tracing: 'Трассировка и метаданные',
    sorting: 'Сортировки',
    overview: 'Обзор и сравнение',
    api: 'Справочник API',
    names: {
      bubble: 'Сортировка пузырьком',
      selection: 'Сортировка выбором',
      insertion: 'Сортировка вставками',
      shell: 'Сортировка Шелла',
      merge: 'Сортировка слиянием',
      quick: 'Быстрая сортировка',
      heap: 'Пирамидальная сортировка',
      counting: 'Сортировка подсчётом',
      radix: 'Поразрядная сортировка',
    },
  },
);

const ptUi: UiLabels = {
  outline: 'Nesta página',
  prev: 'Página anterior',
  next: 'Página seguinte',
  lastUpdated: 'Atualizado',
  editLink: 'Sugerir uma alteração no GitHub',
  returnToTop: 'Voltar ao topo',
  menu: 'Menu',
  darkMode: 'Aspeto',
  language: 'Idioma',
  search: 'Pesquisar',
  noResults: 'Sem resultados',
};

const pt = locale(
  '/pt',
  'pt-PT',
  'Português',
  'Estruturas de dados e algoritmos em TypeScript, explicados.',
  {
    ui: ptUi,
    guide: 'Guia',
    gettingStarted: 'Primeiros passos',
    tracing: 'Rastreio e metadados',
    sorting: 'Ordenação',
    overview: 'Visão geral e comparação',
    api: 'Referência da API',
    names: {
      bubble: 'Ordenação por flutuação (bubble sort)',
      selection: 'Ordenação por seleção',
      insertion: 'Ordenação por inserção',
      shell: 'Shell sort',
      merge: 'Ordenação por fusão (merge sort)',
      quick: 'Quicksort',
      heap: 'Heapsort',
      counting: 'Ordenação por contagem',
      radix: 'Radix sort',
    },
  },
);

const esUi: UiLabels = {
  outline: 'En esta página',
  prev: 'Página anterior',
  next: 'Página siguiente',
  lastUpdated: 'Actualizado',
  editLink: 'Sugerir un cambio en GitHub',
  returnToTop: 'Volver arriba',
  menu: 'Menú',
  darkMode: 'Apariencia',
  language: 'Idioma',
  search: 'Buscar',
  noResults: 'Sin resultados',
};

const es = locale(
  '/es',
  'es',
  'Español',
  'Estructuras de datos y algoritmos en TypeScript, explicados.',
  {
    ui: esUi,
    guide: 'Guía',
    gettingStarted: 'Primeros pasos',
    tracing: 'Trazado y metadatos',
    sorting: 'Ordenamiento',
    overview: 'Resumen y comparación',
    api: 'Referencia de la API',
    names: {
      bubble: 'Ordenamiento de burbuja',
      selection: 'Ordenamiento por selección',
      insertion: 'Ordenamiento por inserción',
      shell: 'Ordenamiento Shell',
      merge: 'Ordenamiento por mezcla',
      quick: 'Ordenamiento rápido (quicksort)',
      heap: 'Ordenamiento por montículos',
      counting: 'Ordenamiento por conteo',
      radix: 'Ordenamiento radix',
    },
  },
);

export default defineConfig({
  title: 'ts-ds',
  base: '/ts-ds/',
  cleanUrls: true,
  lastUpdated: true,
  markdown: { math: true },
  locales: {
    root: { ...en, themeConfig: en },
    ru: { ...ru, link: '/ru/', themeConfig: ru },
    pt: { ...pt, link: '/pt/', themeConfig: pt },
    es: { ...es, link: '/es/', themeConfig: es },
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: { ru: searchLocale(ruUi), pt: searchLocale(ptUi), es: searchLocale(esUi) },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pluhsoft/ts-ds' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/ts-ds' },
    ],
    editLink: {
      pattern: 'https://github.com/pluhsoft/ts-ds/edit/develop/site/:path',
      text: 'Suggest changes on GitHub',
    },
    footer: {
      message: 'MIT License',
      copyright: '© Andrei Pliukhaev',
    },
  },
});
