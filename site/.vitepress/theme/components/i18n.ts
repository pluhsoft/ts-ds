export interface VisualizerText {
  algorithm: string;
  input: string;
  size: string;
  speed: string;
  example: string;
  random: string;
  nearlySorted: string;
  reversed: string;
  fewUnique: string;
  custom: string;
  customPlaceholder: string;
  apply: string;
  play: string;
  pause: string;
  stepBack: string;
  stepForward: string;
  reset: string;
  step: string;
  of: string;
  comparisons: string;
  swaps: string;
  writes: string;
  start: string;
  done: string;
  compare: (a: string, b: string, result: string) => string;
  swap: (i: number, j: number) => string;
  write: (value: string, index: number) => string;
  invalidInput: string;
  legendCompare: string;
  legendChange: string;
  pseudocode: string;
  first: string;
  second: string;
  finishedIn: (steps: number) => string;
  names: Record<string, string>;
}

const en: VisualizerText = {
  algorithm: 'Algorithm',
  input: 'Input',
  size: 'Size',
  speed: 'Speed',
  example: 'Example from the text',
  random: 'Random',
  nearlySorted: 'Nearly sorted',
  reversed: 'Reversed',
  fewUnique: 'Few unique',
  custom: 'Your numbers',
  customPlaceholder: '5, 2, 4, 6, 1, 3',
  apply: 'Apply',
  play: 'Play',
  pause: 'Pause',
  stepBack: 'Step back',
  stepForward: 'Step forward',
  reset: 'Reset',
  step: 'Step',
  of: 'of',
  comparisons: 'Comparisons',
  swaps: 'Swaps',
  writes: 'Writes',
  start: 'Press Play or step forward to start.',
  done: 'Sorted.',
  compare: (a, b, result) => `Compare ${a} and ${b}: ${result}`,
  swap: (i, j) => `Swap positions ${i} and ${j}`,
  write: (value, index) => `Write ${value} to position ${index}`,
  invalidInput: 'Enter 2 to 60 integers separated by commas.',
  legendCompare: 'compared',
  legendChange: 'changed',
  pseudocode: 'Pseudocode',
  first: 'First',
  second: 'Second',
  finishedIn: (steps) => `Done in ${steps} steps`,
  names: {},
};

const ru: VisualizerText = {
  algorithm: 'Алгоритм',
  input: 'Данные',
  size: 'Размер',
  speed: 'Скорость',
  example: 'Пример из текста',
  random: 'Случайные',
  nearlySorted: 'Почти отсортированные',
  reversed: 'Обратный порядок',
  fewUnique: 'Много повторов',
  custom: 'Свои числа',
  customPlaceholder: '5, 2, 4, 6, 1, 3',
  apply: 'Применить',
  play: 'Старт',
  pause: 'Пауза',
  stepBack: 'Шаг назад',
  stepForward: 'Шаг вперёд',
  reset: 'Сначала',
  step: 'Шаг',
  of: 'из',
  comparisons: 'Сравнений',
  swaps: 'Обменов',
  writes: 'Записей',
  start: 'Нажмите «Старт» или сделайте шаг вперёд.',
  done: 'Отсортировано.',
  compare: (a, b, result) => `Сравниваем ${a} и ${b}: ${result}`,
  swap: (i, j) => `Меняем местами позиции ${i} и ${j}`,
  write: (value, index) => `Записываем ${value} в позицию ${index}`,
  invalidInput: 'Введите от 2 до 60 целых чисел через запятую.',
  legendCompare: 'сравнение',
  legendChange: 'изменение',
  pseudocode: 'Псевдокод',
  first: 'Первый',
  second: 'Второй',
  finishedIn: (steps) => `Готово за ${steps} шагов`,
  names: {
    bubble: 'Пузырьком',
    selection: 'Выбором',
    insertion: 'Вставками',
    shell: 'Шелла',
    merge: 'Слиянием',
    quick: 'Быстрая',
    heap: 'Пирамидальная',
    counting: 'Подсчётом',
    radix: 'Поразрядная',
  },
};

const pt: VisualizerText = {
  algorithm: 'Algoritmo',
  input: 'Dados',
  size: 'Tamanho',
  speed: 'Velocidade',
  example: 'Exemplo do texto',
  random: 'Aleatórios',
  nearlySorted: 'Quase ordenados',
  reversed: 'Ordem inversa',
  fewUnique: 'Muitos repetidos',
  custom: 'Os seus números',
  customPlaceholder: '5, 2, 4, 6, 1, 3',
  apply: 'Aplicar',
  play: 'Iniciar',
  pause: 'Pausa',
  stepBack: 'Passo atrás',
  stepForward: 'Passo à frente',
  reset: 'Recomeçar',
  step: 'Passo',
  of: 'de',
  comparisons: 'Comparações',
  swaps: 'Trocas',
  writes: 'Escritas',
  start: 'Carregue em «Iniciar» ou avance um passo.',
  done: 'Ordenado.',
  compare: (a, b, result) => `Comparar ${a} e ${b}: ${result}`,
  swap: (i, j) => `Trocar as posições ${i} e ${j}`,
  write: (value, index) => `Escrever ${value} na posição ${index}`,
  invalidInput: 'Introduza entre 2 e 60 inteiros separados por vírgulas.',
  legendCompare: 'comparação',
  legendChange: 'alteração',
  pseudocode: 'Pseudocódigo',
  first: 'Primeiro',
  second: 'Segundo',
  finishedIn: (steps) => `Terminado em ${steps} passos`,
  names: {
    bubble: 'Flutuação',
    selection: 'Seleção',
    insertion: 'Inserção',
    shell: 'Shell',
    merge: 'Fusão',
    quick: 'Quicksort',
    heap: 'Heapsort',
    counting: 'Contagem',
    radix: 'Radix',
  },
};

const es: VisualizerText = {
  algorithm: 'Algoritmo',
  input: 'Datos',
  size: 'Tamaño',
  speed: 'Velocidad',
  example: 'Ejemplo del texto',
  random: 'Aleatorios',
  nearlySorted: 'Casi ordenados',
  reversed: 'Orden inverso',
  fewUnique: 'Muchos repetidos',
  custom: 'Tus números',
  customPlaceholder: '5, 2, 4, 6, 1, 3',
  apply: 'Aplicar',
  play: 'Iniciar',
  pause: 'Pausa',
  stepBack: 'Paso atrás',
  stepForward: 'Paso adelante',
  reset: 'Reiniciar',
  step: 'Paso',
  of: 'de',
  comparisons: 'Comparaciones',
  swaps: 'Intercambios',
  writes: 'Escrituras',
  start: 'Pulsa «Iniciar» o avanza un paso.',
  done: 'Ordenado.',
  compare: (a, b, result) => `Comparar ${a} y ${b}: ${result}`,
  swap: (i, j) => `Intercambiar las posiciones ${i} y ${j}`,
  write: (value, index) => `Escribir ${value} en la posición ${index}`,
  invalidInput: 'Introduce entre 2 y 60 enteros separados por comas.',
  legendCompare: 'comparación',
  legendChange: 'cambio',
  pseudocode: 'Pseudocódigo',
  first: 'Primero',
  second: 'Segundo',
  finishedIn: (steps) => `Terminado en ${steps} pasos`,
  names: {
    bubble: 'Burbuja',
    selection: 'Selección',
    insertion: 'Inserción',
    shell: 'Shell',
    merge: 'Mezcla',
    quick: 'Rápido',
    heap: 'Montículos',
    counting: 'Conteo',
    radix: 'Radix',
  },
};

/** UI texts for the page language (`en`, `ru`, `pt-PT`, `es`). */
export function textFor(lang: string): VisualizerText {
  if (lang.startsWith('ru')) return ru;
  if (lang.startsWith('pt')) return pt;
  if (lang.startsWith('es')) return es;
  return en;
}
