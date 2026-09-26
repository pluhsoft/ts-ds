# Ordenação por contagem

## Ideia

Se os valores forem inteiros de um intervalo pequeno, nem é preciso compará-los. Conta-se quantas
vezes aparece cada valor e depois calcula-se, para cada valor, quantos elementos **não são maiores**
do que ele — é exatamente a sua última posição no array ordenado.

Com `k = max − min + 1` valores possíveis:

1. `count[v]` — quantas vezes aparece `v`.
2. **Somas acumuladas**: `count[v] = count[0] + … + count[v]` — quantos elementos são ≤ `v`.
3. Percorre-se a entrada **a partir do fim** e coloca-se cada valor na posição `--count[v]`.
   Percorrer de trás para a frente mantém os valores iguais pela ordem original — a ordenação é
   **estável**, e é nisso que o radix sort se apoia.

## Exemplo

Ordenar `[2, 5, 3, 0, 2, 3, 0, 3]` — o exemplo de Cormen (valores 0…5).

| Valor                      | 0   | 1   | 2   | 3   | 4   | 5   |
| -------------------------- | --- | --- | --- | --- | --- | --- |
| `count` (ocorrências)      | 2   | 0   | 2   | 3   | 0   | 1   |
| `count` (somas acumuladas) | 2   | 2   | 4   | 7   | 7   | 8   |

Colocando a partir do fim: o último `3` vai para a posição `7 − 1 = 6`, o último `0` para
`2 − 1 = 1`, o `3` seguinte para `6 − 1 = 5`, e assim por diante. Resultado:
`0, 0, 2, 2, 3, 3, 3, 5`.

## Pseudocódigo

```text
COUNTING-SORT(A)
  min, max = minimum and maximum of A
  k = max − min + 1
  count[0..k − 1] = 0
  for each v in A
    count[v − min] = count[v − min] + 1
  for v = 1 to k − 1
    count[v] = count[v] + count[v − 1]
  for i = n − 1 downto 0
    v = A[i]
    count[v − min] = count[v − min] − 1
    B[count[v − min]] = v
  copy B to A
```

## Complexidade

| Melhor   | Médio    | Pior     | Memória  | Estável | No local |
| -------- | -------- | -------- | -------- | ------- | -------- |
| O(n + k) | O(n + k) | O(n + k) | O(n + k) | sim     | não      |

- Tempo linear quando `k = O(n)`. Isto não contradiz o limite inferior Ω(n log n): esse limite só se
  aplica a algoritmos que comparam elementos.
- **Memória** O(k) para os contadores — para valores como `[0, 1 000 000 000]` seriam gigabytes. A
  biblioteca limita `k` a `COUNTING_SORT_MAX_RANGE` = 2²⁶ e lança um `RangeError` acima disso: para
  intervalos largos use o radix sort.
- **Apenas inteiros.** `1.5`, `NaN` ou `Infinity` lançam um `TypeError`. Os valores negativos são
  aceites — são deslocados por `min`.

## Quando utilizar

Inteiros (ou chaves que se convertem em inteiros: idades, notas, bytes) num intervalo não muito
maior do que o número de elementos. E como peça do radix sort.

## Utilização

```ts
import { countingSort } from 'ts-ds';

const grades = [14, 18, 12, 18, 10, 14, 18];
countingSort(grades); // [10, 12, 14, 14, 18, 18, 18]
```

[Referência da API](/api/functions/countingSort)

## Bibliografia

- H. H. Seward, 1954 (tese de mestrado, MIT).
- Cormen, §8.1 "Lower bounds for sorting" e §8.2 "Counting sort".
