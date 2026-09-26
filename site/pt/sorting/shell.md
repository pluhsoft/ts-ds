# Shell sort

## Ideia

A ordenação por inserção é lenta porque um elemento só avança uma posição por deslocamento. Donald
Shell (1959) propôs ordenar primeiro elementos distantes: ordenar cada `h`-ésimo elemento (o array
fica "h-ordenado"), depois usar um `h` menor e terminar com `h = 1` — a simples ordenação por
inserção, que agora é rápida porque cada elemento já está perto do seu lugar.

Esta implementação usa a **sequência de intervalos de Knuth** 1, 4, 13, 40, 121, … (`h = 3h + 1`),
começando pelo maior intervalo abaixo de n/3.

## Exemplo

Ordenar `[9, 8, 3, 7, 5, 6, 4, 1, 2, 0]` (n = 10, intervalos 4 e 1).

**Intervalo 4** — quatro ordenações por inserção independentes nas posições `{0, 4, 8}`,
`{1, 5, 9}`, `{2, 6}`, `{3, 7}`:

| Grupo   | Antes   | Depois  |
| ------- | ------- | ------- |
| 0, 4, 8 | 9, 5, 2 | 2, 5, 9 |
| 1, 5, 9 | 8, 6, 0 | 0, 6, 8 |
| 2, 6    | 3, 4    | 3, 4    |
| 3, 7    | 7, 1    | 1, 7    |

Array: `2, 0, 3, 1, 5, 6, 4, 7, 9, 8` — cada elemento está a poucas posições do seu lugar.

**Intervalo 1** — a ordenação por inserção termina com apenas 6 deslocamentos (as 6 inversões
restantes): `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`.

## Experimente

O mesmo exemplo, passo a passo. Altere os dados ou carregue em «Iniciar».

<ClientOnly>
  <SortVisualizer algorithm="shell" :input="[9, 8, 3, 7, 5, 6, 4, 1, 2, 0]" />
</ClientOnly>

## Pseudocódigo

```text
SHELL-SORT(A)
  h = 1
  while h < ⌊n / 3⌋
    h = 3h + 1
  while h ≥ 1
    for i = h to n − 1            // ordenação por inserção com intervalo h
      key = A[i]
      j = i
      while j ≥ h and A[j − h] > key
        A[j] = A[j − h]
        j = j − h
      A[j] = key
    h = (h − 1) / 3
```

## Complexidade

| Melhor     | Médio       | Pior     | Memória | Estável | No local |
| ---------- | ----------- | -------- | ------- | ------- | -------- |
| O(n log n) | ≈ O(n^1.25) | O(n^1.5) | O(1)    | não     | sim      |

- A complexidade depende da sequência de intervalos e continua a ser um problema em aberto. Para a
  sequência de Knuth está provado o pior caso O(n^(3/2)) (Pratt, 1971); em média observa-se cerca
  de n^1.25.
- A sequência original de Shell n/2, n/4, …, 1 é pior: O(n²) no pior caso.
- **Não é estável**: os saltos longos podem levar um elemento para lá de um igual.

## Quando utilizar

Quando é preciso algo muito mais rápido do que as ordenações O(n²), mas simples, sem recursão e sem
memória adicional — por exemplo, em sistemas embebidos. Em arrays grandes ganham os algoritmos
O(n log n).

## Utilização

```ts
import { shellSort } from 'ts-ds';

const array = [9, 8, 3, 7, 5, 6, 4, 1, 2, 0];
shellSort(array);
```

[Referência da API](/api/functions/shellSort)

## Bibliografia

- D. L. Shell. "A high-speed sorting procedure". _Communications of the ACM_ 2(7), 1959.
- Knuth, _TAOCP_ Vol. 3, §5.2.1 "Shell's method".
- Sedgewick, _Algorithms_, §2.1.
