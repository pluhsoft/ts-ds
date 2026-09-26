# Ordenação por fusão (merge sort)

## Ideia

**Dividir para conquistar**:

1. **Dividir** o array em duas metades.
2. **Conquistar** — ordenar cada metade recursivamente (um array de um elemento já está ordenado).
3. **Combinar** — _fundir_ as duas metades ordenadas: tirar repetidamente o menor dos dois
   elementos da frente.

Fundir duas listas ordenadas com n elementos no total exige apenas n − 1 comparações — e é esse o
segredo.

## Exemplo

Ordenar `[5, 2, 4, 6, 1, 3]`:

```text
                [5, 2, 4, 6, 1, 3]
               /                  \
        [5, 2, 4]                [6, 1, 3]
         /     \                  /     \
     [5, 2]    [4]            [6, 1]    [3]
     /    \                   /    \
   [5]    [2]               [6]    [1]
     \    /                   \    /
     [2, 5]    [4]            [1, 6]    [3]
         \     /                  \     /
        [2, 4, 5]                [1, 3, 6]
               \                  /
                [1, 2, 3, 4, 5, 6]
```

A última fusão passo a passo — comparam-se os elementos da frente e tira-se o menor:

| Esquerda    | Direita     | Tira | Resultado        |
| ----------- | ----------- | ---- | ---------------- |
| **2**, 4, 5 | **1**, 3, 6 | 1    | 1                |
| **2**, 4, 5 | **3**, 6    | 2    | 1, 2             |
| **4**, 5    | **3**, 6    | 3    | 1, 2, 3          |
| **4**, 5    | **6**       | 4    | 1, 2, 3, 4       |
| **5**       | **6**       | 5    | 1, 2, 3, 4, 5    |
| —           | 6           | 6    | 1, 2, 3, 4, 5, 6 |

## Experimente

O mesmo exemplo, passo a passo. Altere os dados ou carregue em «Iniciar».

<ClientOnly>
  <SortVisualizer algorithm="merge" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocódigo

```text
MERGE-SORT(A, low, high)
  if low ≥ high
    return
  mid = ⌊(low + high) / 2⌋
  MERGE-SORT(A, low, mid)
  MERGE-SORT(A, mid + 1, high)
  if A[mid] ≤ A[mid + 1]              // as metades já estão por ordem
    return
  MERGE(A, low, mid, high)

MERGE(A, low, mid, high)
  copy A[low..high] to B[low..high]
  i = low, j = mid + 1
  for k = low to high
    if i > mid:            A[k] = B[j], j = j + 1
    else if j > high:      A[k] = B[i], i = i + 1
    else if B[j] < B[i]:   A[k] = B[j], j = j + 1
    else:                  A[k] = B[i], i = i + 1   // em empate, tira-se o da esquerda: estável
```

## Complexidade

| Melhor | Médio      | Pior       | Memória | Estável | No local |
| ------ | ---------- | ---------- | ------- | ------- | -------- |
| O(n)   | O(n log n) | O(n log n) | O(n)    | sim     | não      |

- A recorrência $T(n) = 2T(n/2) + \Theta(n)$ dá $T(n) = \Theta(n \log n)$: a árvore de recursão tem
  $\log_2 n$ níveis e em cada nível fundem-se n elementos no total.
- A verificação `A[mid] ≤ A[mid + 1]` evita fundir metades que já estão por ordem, por isso um array
  ordenado demora O(n).
- **Memória** O(n) para o buffer — um único buffer é criado uma vez e reutilizado.
- **Estável**: em caso de empate, a fusão tira primeiro o elemento da metade esquerda.

## Quando utilizar

Quando é preciso uma ordenação **estável** ou O(n log n) **garantido**. É também a base da ordenação
externa (dados que não cabem em memória) e do TimSort, o algoritmo de `Array.prototype.sort`.

## Utilização

```ts
import { mergeSort } from 'ts-ds';

const tasks = [
  { title: 'B', priority: 2 },
  { title: 'A', priority: 1 },
  { title: 'C', priority: 2 },
];
mergeSort(tasks, (a, b) => a.priority - b.priority);
// A (1), B (2), C (2) — o B fica antes do C
```

[Referência da API](/api/functions/mergeSort)

## Bibliografia

- Cormen, §2.3 "Designing algorithms" (merge sort e dividir para conquistar), capítulo 4
  (recorrências).
- Sedgewick, _Algorithms_, §2.2 "Mergesort".
- Knuth, _TAOCP_ Vol. 3, §5.2.4 "Sorting by merging".
