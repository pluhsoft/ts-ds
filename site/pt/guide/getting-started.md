# Primeiros passos

## Instalação

```bash
npm install ts-ds
```

O pacote não tem dependências. Funciona no Node.js 18+ e em qualquer bundler, com módulos ES e
CommonJS.

## A primeira ordenação

```ts
import { quickSort } from 'ts-ds';

const numbers = [5, 2, 4, 6, 1, 3];
quickSort(numbers);
console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

::: warning A ordenação altera o array
Todas as funções de ordenação ordenam o array **no próprio local** e não devolvem nada (`void`). É a
mesma convenção de `list.sort()` em Python ou `Arrays.sort()` em Java: uma função ou altera os dados
ou devolve um resultado, nunca as duas coisas
([separação entre comandos e consultas](https://en.wikipedia.org/wiki/Command%E2%80%93query_separation)).

```ts
const sorted = quickSort(numbers); // erro do TypeScript: quickSort devolve void
```

Para manter o array original, ordene uma cópia:

```ts
const copy = [...numbers];
quickSort(copy);
```

:::

## Ordem personalizada

As ordenações por comparação aceitam um comparador opcional, exatamente como
`Array.prototype.sort`: devolve um número negativo se `a` vem primeiro, um número positivo se `b`
vem primeiro e `0` se forem iguais.

```ts
import { mergeSort } from 'ts-ds';

const people = [
  { name: 'Ana', age: 30 },
  { name: 'Bruno', age: 20 },
  { name: 'Eva', age: 30 },
];

mergeSort(people, (a, b) => a.age - b.age);
// Bruno (20), Ana (30), Eva (30) — o merge sort é estável, a Ana fica antes da Eva

mergeSort(people, (a, b) => b.age - a.age); // por ordem decrescente
```

Sem comparador, os valores são ordenados por ordem crescente com `<`. As strings são comparadas por
unidades de código UTF-16 (`'B' < 'a'`); para a ordem alfabética utilize
`(a, b) => a.localeCompare(b)`. O `NaN` fica no fim.

## Formas de importar

```ts
import { quickSort, heapSort } from 'ts-ds'; // funções individuais
import { sort } from 'ts-ds'; // todos os algoritmos: sort.quick, sort.heap, …
import { quickSort } from 'ts-ds/sort'; // apenas a ordenação
const { quickSort } = require('ts-ds'); // CommonJS
```

Com importações nomeadas, o bundler descarta os algoritmos que não utiliza. O objeto `sort` é
prático para experiências e comparações, mas inclui sempre todos os algoritmos.

## Próximos passos

- [Ordenação: visão geral e comparação](/pt/sorting/) — que algoritmo escolher e porquê.
- [Referência da API](/api/) — todas as funções e tipos (em inglês).
