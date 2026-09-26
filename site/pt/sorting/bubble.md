# Ordenação por flutuação (bubble sort)

## Ideia

Percorre-se o array e trocam-se todos os pares de vizinhos que estão pela ordem errada. Depois da
primeira passagem, o maior elemento "flutuou" até ao fim; depois da segunda, o segundo maior está no
seu lugar, e assim por diante. Se uma passagem não fizer trocas, o array está ordenado.

## Exemplo

Ordenar `[5, 2, 4, 6, 1, 3]`. A cauda ordenada está a **negrito**.

| Passagem | Array depois da passagem | O que aconteceu                   |
| -------- | ------------------------ | --------------------------------- |
| 1        | 2, 4, 5, 1, 3, **6**     | o 6 flutuou até ao fim (4 trocas) |
| 2        | 2, 4, 1, 3, **5, 6**     | o 5 no seu lugar (2 trocas)       |
| 3        | 2, 1, 3, **4, 5, 6**     | o 4 no seu lugar (2 trocas)       |
| 4        | 1, **2, 3, 4, 5, 6**     | o 3 e o 2 no seu lugar (1 troca)  |
| 5        | **1, 2, 3, 4, 5, 6**     | sem trocas — parar                |

15 comparações, 9 trocas. O número de trocas é igual ao número de _inversões_ — pares fora de ordem.

## Pseudocódigo

```text
BUBBLE-SORT(A)
  for pass = 0 to n − 2
    swapped = false
    for i = 0 to n − pass − 2
      if A[i] > A[i + 1]
        swap A[i] and A[i + 1]
        swapped = true
    if not swapped
      return
```

## Complexidade

| Melhor | Médio | Pior  | Memória | Estável | No local |
| ------ | ----- | ----- | ------- | ------- | -------- |
| O(n)   | O(n²) | O(n²) | O(1)    | sim     | sim      |

- **Pior caso** (array por ordem inversa): passagens de n − 1, n − 2, …, 1 comparações —
  $\frac{n(n-1)}{2}$ no total, e todas as comparações resultam numa troca.
- **Melhor caso** (já ordenado): uma passagem com n − 1 comparações e nenhuma troca — graças à
  variável `swapped`.
- **Estável**: só se trocam vizinhos em que o da esquerda é estritamente maior, por isso elementos
  iguais nunca se ultrapassam.

## Quando utilizar

Na prática, quase nunca — a ordenação por inserção é igualmente simples e mais rápida. O valor da
flutuação está em ser o primeiro algoritmo: mostra o que significam "ordenado", "passagem", "troca"
e "inversão".

## Utilização

```ts
import { bubbleSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
bubbleSort(array);
bubbleSort(array, (a, b) => b - a); // por ordem decrescente
```

[Referência da API](/api/functions/bubbleSort)

## Bibliografia

- Knuth, _TAOCP_ Vol. 3, §5.2.2 "Sorting by exchanging".
- Cormen, problema 2-2 "Correctness of bubblesort".
