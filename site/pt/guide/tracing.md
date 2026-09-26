# Rastreio e metadados

## Veja cada passo de um algoritmo

`trace` executa qualquer função de ordenação e regista cada comparação e cada alteração do array —
sem mudar o algoritmo. É a base das visualizações e uma ferramenta prática para as aulas
laboratoriais: contar comparações, verificar um rastreio feito à mão, comparar algoritmos com os
mesmos dados.

```ts
import { bubbleSort, trace } from 'ts-ds';

const { input, output, steps, stats } = trace(bubbleSort, [3, 1, 2]);

output; // [1, 2, 3] — o array de entrada não é alterado
stats; // { comparisons: 3, reads: 10, writes: 4, swaps: 2 }
steps;
// [
//   { type: 'compare', values: [3, 1], indices: [0, 1], result: 1 },
//   { type: 'swap', i: 0, j: 1 },
//   { type: 'compare', values: [3, 2], indices: [1, 2], result: 1 },
//   { type: 'swap', i: 1, j: 2 },
//   { type: 'compare', values: [1, 2], indices: [0, 1], result: -1 },
// ]
```

Há três tipos de passos:

| Passo     | Significado                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `compare` | O comparador foi chamado com `values`; `indices` são as suas posições no array.                                           |
| `swap`    | Os elementos nas posições `i` e `j` foram trocados.                                                                       |
| `write`   | Foi escrito `value` na posição `index` (um deslocamento na inserção, um passo da fusão, …); `previous` é o que lá estava. |

## Reproduzir

`replay(input, steps, count)` devolve o array depois dos primeiros `count` passos — cada fotograma de
uma animação:

```ts
import { replay } from 'ts-ds';

replay(input, steps, 0); // [3, 1, 2]
replay(input, steps, 2); // [1, 3, 2] — depois da primeira troca
replay(input, steps); // [1, 2, 3]
```

## Comparar algoritmos

`sortingAlgorithms` descreve cada algoritmo: nome, complexidade, estabilidade e se ordena no próprio
local. Juntamente com `trace`, dá uma tabela comparativa em poucas linhas:

```ts
import { sortingAlgorithms, trace } from 'ts-ds';

const data = [5, 2, 4, 6, 1, 3];
for (const algorithm of sortingAlgorithms) {
  if (algorithm.kind === 'comparison') {
    const { stats } = trace(algorithm.sort, data);
    console.log(algorithm.name, algorithm.complexity.average, stats.comparisons, stats.swaps);
  }
}
```

| Algoritmo | Médio      | Comparações | Trocas | Escritas |
| --------- | ---------- | ----------- | ------ | -------- |
| Flutuação | O(n²)      | 15          | 9      | 18       |
| Seleção   | O(n²)      | 15          | 3      | 6        |
| Inserção  | O(n²)      | 12          | 0      | 14       |
| Shell     | O(n^1.25)  | 11          | 0      | 12       |
| Fusão     | O(n log n) | 16          | 0      | 16       |
| Quicksort | O(n log n) | 21          | 9      | 22       |
| Heapsort  | O(n log n) | 16          | 11     | 22       |

Com seis elementos, os algoritmos "rápidos" ainda não são mais rápidos — a diferença aparece em
arrays grandes. Experimente `n = 1000`.

## Como funciona

O array é envolvido num [`Proxy`](https://developer.mozilla.org/pt-PT/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
que vê cada leitura e escrita, e o comparador numa função que conta as chamadas. Os algoritmos são
exatamente as mesmas funções que importa, por isso o rastreio mostra o que realmente acontece — e,
sem `trace`, funcionam sem qualquer custo adicional.

Limitações:

- Os `indices` de uma comparação ficam vazios quando um valor não vem diretamente do array: o
  quicksort compara com um pivô guardado, o merge sort com elementos do seu buffer.
- A ordenação por contagem e o radix sort trabalham em arrays auxiliares; o rastreio mostra apenas
  como o resultado é escrito de volta.

[Referência da API: trace](/api/functions/trace) · [replay](/api/functions/replay) ·
[sortingAlgorithms](/api/variables/sortingAlgorithms)
