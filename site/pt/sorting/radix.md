# Radix sort

## Ideia

Ordenam-se os números **dígito a dígito, começando pelo menos significativo** (LSD — least
significant digit). Cada passagem é uma ordenação **estável** por um dígito: uma ordenação por
contagem com apenas 10 valores possíveis. Como cada passagem é estável, a ordem estabelecida pelos
dígitos menos significativos mantém-se entre os números com o mesmo dígito mais significativo.
Depois da passagem pelo dígito mais significativo, o array está ordenado.

Os números negativos são ordenados à parte pelo valor absoluto e colocados à frente por ordem
inversa.

## Exemplo

Ordenar `[170, 45, 75, 90, 802, 24, 2, 66]`. O dígito da passagem atual está a **negrito**; na última
passagem mostram-se zeros à esquerda para maior clareza.

| Passagem | Array depois da passagem                                               |
| -------- | ---------------------------------------------------------------------- |
| entrada  | 170, 45, 75, 90, 802, 24, 2, 66                                        |
| unidades | 17**0**, 9**0**, 80**2**, **2**, 2**4**, 4**5**, 7**5**, 6**6**        |
| dezenas  | 8**0**2, **0**2, **2**4, **4**5, **6**6, 1**7**0, **7**5, **9**0       |
| centenas | **0**02, **0**24, **0**45, **0**66, **0**75, **0**90, **1**70, **8**02 |

Repare no 170 e no 75 depois da passagem pelas dezenas: ambos têm 7 dezenas, e o 170 fica antes do
75 porque estava antes dele depois da passagem pelas unidades (0 < 5). É por isso que cada passagem
tem de ser estável.

## Pseudocódigo

```text
RADIX-SORT(A)                          // inteiros não negativos
  max = maximum of A
  place = 1
  while ⌊max / place⌋ > 0
    stable COUNTING-SORT of A by digit ⌊A[i] / place⌋ mod 10
    place = place × 10
```

## Complexidade

| Melhor      | Médio       | Pior        | Memória  | Estável | No local |
| ----------- | ----------- | ----------- | -------- | ------- | -------- |
| O(d(n + b)) | O(d(n + b)) | O(d(n + b)) | O(n + b) | sim     | não      |

- `d` — número de dígitos do maior valor absoluto, `b = 10` — a base. Para números com um número
  limitado de dígitos, o tempo é **linear** em n.
- Ao contrário da ordenação por contagem, a memória não depende do intervalo de valores:
  `[0, 1 000 000 000]` precisa de 10 passagens, não de mil milhões de contadores.
- **Apenas inteiros** (até `Number.MAX_SAFE_INTEGER`); qualquer outro valor lança um `TypeError`.

## Quando utilizar

Muitos inteiros com um número limitado de dígitos: identificadores, marcas temporais, códigos
postais. Também para strings com o mesmo comprimento (ordenando por carateres em vez de dígitos) e
como ideia para ordenar chaves compostas por vários campos.

## Utilização

```ts
import { radixSort } from 'ts-ds';

const ids = [170, 45, 75, -90, 802, 24, 2, 66];
radixSort(ids); // [-90, 2, 24, 45, 66, 75, 170, 802]
```

[Referência da API](/api/functions/radixSort)

## Bibliografia

- As máquinas tabuladoras de H. Hollerith (década de 1890) ordenavam cartões perfurados desta forma.
- Cormen, §8.3 "Radix sort".
- Sedgewick, _Algorithms_, §5.1 "String sorts" (radix sort LSD e MSD).
