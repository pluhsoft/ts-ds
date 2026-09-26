# Heapsort

## Ideia

Um **max-heap binário** é um array visto como uma árvore binária completa: os filhos de `A[i]` são
`A[2i + 1]` e `A[2i + 2]`, e cada pai não é menor do que os filhos. Assim, o maior elemento está
sempre na raiz `A[0]`.

1. **Construir um heap** a partir do array.
2. Trocar a raiz (o máximo) com o último elemento do heap — o máximo fica no seu lugar definitivo.
   Reduzir o heap em um e **fazer descer** a nova raiz para repor a propriedade do heap.
3. Repetir até o heap ficar vazio.

## Exemplo

Ordenar `[5, 2, 4, 6, 1, 3]`.

**1. Construir o max-heap** — fazer descer cada pai, do último até à raiz:

```text
      5                5                6
    /   \            /   \            /   \
   2     4    →     6     4    →     5     4
  / \   /          / \   /          / \   /
 6   1 3          2   1 3          2   1 3
```

O heap como array: `6, 5, 4, 2, 1, 3`.

**2. Extrair o máximo** repetidamente. A cauda ordenada está a **negrito**:

| Passo | Trocar a raiz com o último | Depois de fazer descer |
| ----- | -------------------------- | ---------------------- |
| 1     | 3, 5, 4, 2, 1, **6**       | 5, 3, 4, 2, 1, **6**   |
| 2     | 1, 3, 4, 2, **5, 6**       | 4, 3, 1, 2, **5, 6**   |
| 3     | 2, 3, 1, **4, 5, 6**       | 3, 2, 1, **4, 5, 6**   |
| 4     | 1, 2, **3, 4, 5, 6**       | 2, 1, **3, 4, 5, 6**   |
| 5     | 1, **2, 3, 4, 5, 6**       | **1, 2, 3, 4, 5, 6**   |

## Pseudocódigo

```text
HEAP-SORT(A)
  for i = ⌊n / 2⌋ − 1 downto 0          // construir o heap
    SIFT-DOWN(A, i, n)
  for end = n − 1 downto 1
    swap A[0] and A[end]
    SIFT-DOWN(A, 0, end)

SIFT-DOWN(A, i, size)                   // o heap é A[0..size − 1]
  loop
    largest = i
    l = 2i + 1, r = 2i + 2
    if l < size and A[l] > A[largest]: largest = l
    if r < size and A[r] > A[largest]: largest = r
    if largest = i: return
    swap A[i] and A[largest]
    i = largest
```

## Complexidade

| Melhor     | Médio      | Pior       | Memória | Estável | No local |
| ---------- | ---------- | ---------- | ------- | ------- | -------- |
| O(n log n) | O(n log n) | O(n log n) | O(1)    | não     | sim      |

- **Construir o heap custa apenas O(n)**, e não O(n log n): a maioria dos nós está perto do fundo e
  desce só alguns níveis ($\sum_h \frac{n}{2^{h+1}} \cdot h = O(n)$).
- Cada uma das n − 1 extrações desce no máximo $\log_2 n$ níveis: O(n log n) no total, **para
  quaisquer dados**.
- **Memória** O(1): o heap vive dentro do próprio array.
- **Não é estável**: trocar a raiz com o último elemento leva elementos para longe.

## Quando utilizar

Quando é preciso O(n log n) **garantido** e **sem memória adicional**. Na prática é mais lento do que
o quicksort porque salta pelo array (má localidade de cache). O mesmo heap é a base de uma **fila de
prioridade**.

## Utilização

```ts
import { heapSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
heapSort(array);
```

[Referência da API](/api/functions/heapSort)

## Bibliografia

- J. W. J. Williams. "Algorithm 232: Heapsort". _Communications of the ACM_ 7(6), 1964.
- Cormen, capítulo 6 "Heapsort".
- Sedgewick, _Algorithms_, §2.4 "Priority queues".
