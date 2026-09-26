# Ordenação por seleção

## Ideia

Encontra-se o menor elemento e coloca-se em primeiro lugar. Depois encontra-se o menor entre os
restantes e coloca-se em segundo. Repete-se até todo o array estar por ordem. O array divide-se num
prefixo ordenado e num sufixo por ordenar; cada passo move um elemento do sufixo para o fim do
prefixo.

## Exemplo

Ordenar `[5, 2, 4, 6, 1, 3]`. O prefixo ordenado está a **negrito**.

| Passo | Mínimo do resto      | Array depois do passo |
| ----- | -------------------- | --------------------- |
| 1     | 1 → troca com o 5    | **1**, 2, 4, 6, 5, 3  |
| 2     | 2 → já está no lugar | **1, 2**, 4, 6, 5, 3  |
| 3     | 3 → troca com o 4    | **1, 2, 3**, 6, 5, 4  |
| 4     | 4 → troca com o 6    | **1, 2, 3, 4**, 5, 6  |
| 5     | 5 → já está no lugar | **1, 2, 3, 4, 5, 6**  |

15 comparações e apenas 3 trocas.

## Pseudocódigo

```text
SELECTION-SORT(A)
  for i = 0 to n − 2
    min = i
    for j = i + 1 to n − 1
      if A[j] < A[min]
        min = j
    if min ≠ i
      swap A[i] and A[min]
```

## Complexidade

| Melhor | Médio | Pior  | Memória | Estável | No local |
| ------ | ----- | ----- | ------- | ------- | -------- |
| O(n²)  | O(n²) | O(n²) | O(1)    | não     | sim      |

- Sempre exatamente $\frac{n(n-1)}{2}$ comparações: para encontrar o mínimo é preciso olhar para
  todos os elementos restantes, sejam quais forem os dados.
- No máximo n − 1 trocas — menos do que qualquer outro algoritmo aqui. Útil quando escrever é muito
  mais caro do que ler (por exemplo, em memória flash).
- **Não é estável**: uma troca à distância pode saltar por cima de um elemento igual. Em
  `[2a, 2b, 1]` o primeiro passo troca `2a` e `1`, obtendo-se `[1, 2b, 2a]`.

## Quando utilizar

Quando o número de escritas importa mais do que o de comparações, ou como exemplo didático do
invariante "prefixo ordenado + sufixo por ordenar".

## Utilização

```ts
import { selectionSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
selectionSort(array);
```

[Referência da API](/api/functions/selectionSort)

## Bibliografia

- Knuth, _TAOCP_ Vol. 3, §5.2.3 "Sorting by selection".
- Sedgewick, _Algorithms_, §2.1.
