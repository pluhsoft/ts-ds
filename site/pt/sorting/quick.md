# Quicksort

## Ideia

**Dividir para conquistar**, mas o trabalho é feito _antes_ da recursão:

1. Escolhe-se um **pivô**.
2. **Partição**: reorganiza-se o array de modo que os elementos não maiores do que o pivô fiquem
   antes dele e os não menores fiquem depois. O pivô está agora no seu lugar definitivo.
3. Ordenam-se as duas partes recursivamente.

Ao contrário do merge sort, não é preciso fundir nada nem usar um array adicional.

Esta implementação segue Hoare e Sedgewick:

- **Pivô mediana de três** — a mediana do primeiro, do elemento do meio e do último. Em arrays
  ordenados e invertidos escolhe a verdadeira mediana, pelo que passam a ser o melhor caso em vez do
  pior.
- **Partição de Hoare** — dois índices avançam um em direção ao outro e trocam os elementos que
  estão do lado errado. Ambos param em elementos iguais ao pivô, por isso muitos duplicados são
  divididos de forma equilibrada.
- **Recursão na parte menor**, um ciclo para a maior — a pilha de chamadas nunca passa de O(log n).

## Exemplo

Ordenar `[5, 2, 4, 6, 1, 3]`.

**Pivô.** O primeiro, o do meio e o último são 5, 4, 3; a sua mediana **4** passa para a frente:
`4, 2, 3, 6, 1, 5`.

**Partição em torno de 4** — `i` avança para a direita enquanto os elementos são menores do que 4,
`j` recua para a esquerda enquanto são maiores do que 4:

| Passo                        | Array                    | Comentário            |
| ---------------------------- | ------------------------ | --------------------- |
| início                       | 4, 2, 3, 6, 1, 5         | pivô 4 na posição 0   |
| `i` para no 6, `j` para no 1 | 4, 2, 3, **6**, **1**, 5 | ambos do lado errado  |
| troca                        | 4, 2, 3, 1, 6, 5         |                       |
| os índices cruzam-se         | 4, 2, 3, **1**, 6, 5     | `j` = 3               |
| pivô ↔ A[j]                  | 1, 2, 3, **4**, 6, 5     | o 4 está no seu lugar |

**Recursão.** `[1, 2, 3]` e `[6, 5]` ordenam-se da mesma forma: `1, 2, 3, 4, 5, 6`.

## Pseudocódigo

```text
QUICK-SORT(A, low, high)
  while low < high
    p = PARTITION(A, low, high)
    if p − low < high − p              // recursão na parte menor
      QUICK-SORT(A, low, p − 1)
      low = p + 1
    else
      QUICK-SORT(A, p + 1, high)
      high = p − 1

PARTITION(A, low, high)                // Hoare, como em Sedgewick
  move the median of A[low], A[mid], A[high] to A[low]
  pivot = A[low]
  i = low, j = high + 1
  loop
    repeat i = i + 1 while i < high and A[i] < pivot
    repeat j = j − 1 while pivot < A[j]
    if i ≥ j
      break
    swap A[i] and A[j]
  swap A[low] and A[j]
  return j
```

## Complexidade

| Melhor     | Médio      | Pior  | Memória  | Estável | No local |
| ---------- | ---------- | ----- | -------- | ------- | -------- |
| O(n log n) | O(n log n) | O(n²) | O(log n) | não     | sim      |

- **Em média**: se o pivô dividir o array em proporções razoáveis, a profundidade da recursão é
  O(log n) e cada nível faz O(n) de trabalho. Com dados aleatórios e pivô aleatório, o quicksort faz
  cerca de $1{,}39\, n \log_2 n$ comparações; com a mediana de três, menos.
- **O pior caso** O(n²) ocorre quando o pivô é sempre o menor ou o maior elemento. Com o pivô "último
  elemento", isso é precisamente um array ordenado! A mediana de três resolve dados ordenados,
  invertidos e iguais (os testes da biblioteca verificam ≤ 1,5 n log₂ n comparações nesses casos),
  mas continuam a existir dados construídos de propósito ("median-of-three killers"). Cormen evita o
  problema com elevada probabilidade escolhendo o pivô ao acaso.
- **Memória** O(log n) para a pilha de chamadas, graças à recursão na parte menor.
- **Não é estável**: a partição troca elementos a grande distância.

## Quando utilizar

É, na prática, a ordenação por comparação de uso geral mais rápida: poucos movimentos de dados e bom
aproveitamento da cache. Se precisar de estabilidade ou de O(n log n) garantido, escolha o merge
sort; o introsort (quicksort que passa para heapsort quando a recursão fica demasiado funda) junta
as vantagens de ambos.

## Utilização

```ts
import { quickSort } from 'ts-ds';

const words = ['pera', 'figo', 'banana', 'kiwi'];
quickSort(words, (a, b) => a.length - b.length);
```

[Referência da API](/api/functions/quickSort)

## Bibliografia

- C. A. R. Hoare. "Quicksort". _The Computer Journal_ 5(1), 1962.
- Cormen, capítulo 7 "Quicksort" (partição de Lomuto, versão aleatorizada, análise).
- Sedgewick, _Algorithms_, §2.3 "Quicksort" (partição de Hoare, mediana de três).
- D. Musser. "Introspective Sorting and Selection Algorithms", 1997.
