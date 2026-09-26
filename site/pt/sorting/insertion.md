# Ordenação por inserção

## Ideia

É assim que a maioria das pessoas ordena as cartas na mão: pega-se na carta seguinte e insere-se no
seu lugar entre as que já estão ordenadas. O prefixo `A[0..i−1]` está sempre ordenado; o passo `i`
insere `A[i]` nele, deslocando os elementos maiores uma posição para a direita.

## Exemplo

Ordenar `[5, 2, 4, 6, 1, 3]` — o exemplo de Cormen. O prefixo ordenado está a **negrito**.

| Passo | Inserido | Array depois do passo | Deslocamentos |
| ----- | -------- | --------------------- | ------------- |
| 1     | 2        | **2, 5**, 4, 6, 1, 3  | 1             |
| 2     | 4        | **2, 4, 5**, 6, 1, 3  | 1             |
| 3     | 6        | **2, 4, 5, 6**, 1, 3  | 0             |
| 4     | 1        | **1, 2, 4, 5, 6**, 3  | 4             |
| 5     | 3        | **1, 2, 3, 4, 5, 6**  | 3             |

12 comparações, 9 deslocamentos — mais uma vez, o número de inversões.

## Experimente

O mesmo exemplo, passo a passo. Altere os dados ou carregue em «Iniciar».

<ClientOnly>
  <SortVisualizer algorithm="insertion" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocódigo

```text
INSERTION-SORT(A)
  for i = 1 to n − 1
    key = A[i]
    j = i − 1
    while j ≥ 0 and A[j] > key
      A[j + 1] = A[j]
      j = j − 1
    A[j + 1] = key
```

## Complexidade

| Melhor | Médio | Pior  | Memória | Estável | No local |
| ------ | ----- | ----- | ------- | ------- | -------- |
| O(n)   | O(n²) | O(n²) | O(1)    | sim     | sim      |

- O tempo de execução é O(n + I), em que I é o número de inversões. Um array ordenado tem 0
  inversões (O(n)), um invertido tem $\frac{n(n-1)}{2}$ (O(n²)), um aleatório cerca de
  $\frac{n^2}{4}$.
- **Adaptativa**: quanto mais perto de ordenado estiver o array, mais rápida é.
- **Estável**: um elemento para no primeiro que não é maior, por isso nunca ultrapassa um igual.
- **Online**: consegue ordenar os dados à medida que chegam.

## Quando utilizar

Arrays pequenos (até algumas dezenas de elementos) e dados quase ordenados. É por isso que os
algoritmos híbridos rápidos — o TimSort de `Array.prototype.sort`, o introsort do C++ — passam para a
inserção nos pedaços pequenos.

## Utilização

```ts
import { insertionSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
insertionSort(array);
```

[Referência da API](/api/functions/insertionSort)

## Bibliografia

- Cormen, §2.1 "Insertion sort" e §2.2 "Analyzing algorithms".
- Knuth, _TAOCP_ Vol. 3, §5.2.1.
