# Algoritmos de ordenação

Ordenar é colocar os elementos por ordem. Parece simples, mas cada algoritmo faz escolhas muito
diferentes entre velocidade, memória, estabilidade e simplicidade — é por isso que todas as
disciplinas de algoritmos começam aqui.

## Comparação

| Algoritmo               | Melhor   | Médio    | Pior     | Memória | Estável | No local |
| ----------------------- | -------- | -------- | -------- | ------- | ------- | -------- |
| [Flutuação](./bubble)   | n        | n²       | n²       | 1       | sim     | sim      |
| [Seleção](./selection)  | n²       | n²       | n²       | 1       | não     | sim      |
| [Inserção](./insertion) | n        | n²       | n²       | 1       | sim     | sim      |
| [Shell](./shell)        | n log n  | ≈ n^1.25 | n^1.5    | 1       | não     | sim      |
| [Fusão](./merge)        | n        | n log n  | n log n  | n       | sim     | não      |
| [Quicksort](./quick)    | n log n  | n log n  | n²       | log n   | não     | sim      |
| [Heapsort](./heap)      | n log n  | n log n  | n log n  | 1       | não     | sim      |
| [Contagem](./counting)  | n + k    | n + k    | n + k    | n + k   | sim     | não      |
| [Radix](./radix)        | d(n + b) | d(n + b) | d(n + b) | n + b   | sim     | não      |

Todas as complexidades são O(…). `k` é o intervalo de valores, `d` o número de dígitos, `b` a base
(10).

## Ideias principais

**Ordenações por comparação** (da flutuação ao heapsort) só perguntam "`a` é menor do que `b`?".
Qualquer algoritmo deste tipo precisa, no pior caso, de pelo menos
$\log_2 n! \approx n \log_2 n$ comparações: há $n!$ ordens possíveis e cada comparação, na melhor
das hipóteses, divide-as ao meio. Assim, O(n log n) é o melhor possível — o merge sort e o heapsort
atingem-no sempre, o quicksort em média.

**A ordenação por contagem e o radix sort** não comparam elementos: usam os próprios valores como
índices do array. É assim que ultrapassam n log n — mas só funcionam com inteiros (ou chaves que se
possam converter em inteiros).

**Estabilidade** — os elementos iguais mantêm a ordem original. Importa quando se ordenam registos
por uma chave e depois por outra: ordene as pessoas pelo nome e depois, de forma estável, pela idade
— as pessoas com a mesma idade ficam por ordem alfabética.

**No local** — o algoritmo precisa apenas de O(1) (ou O(log n)) de memória adicional além do array.

## Qual escolher

| Situação                               | Escolha                                       |
| -------------------------------------- | --------------------------------------------- |
| Uso geral, o mais rápido em média      | [Quicksort](./quick)                          |
| Tem de ser estável ou garantir n log n | [Fusão](./merge)                              |
| n log n garantido com memória O(1)     | [Heapsort](./heap)                            |
| Arrays pequenos ou quase ordenados     | [Inserção](./insertion)                       |
| Inteiros num intervalo pequeno         | [Contagem](./counting)                        |
| Muitos inteiros com poucos dígitos     | [Radix](./radix)                              |
| Aprender os fundamentos                | [Flutuação](./bubble), [seleção](./selection) |

Em código JavaScript de produção, `Array.prototype.sort` (TimSort, um híbrido de fusão e inserção)
é normalmente a escolha certa. Esta biblioteca mostra como funcionam os algoritmos clássicos e
oferece implementações fiáveis para aulas, experiências e casos especiais.

## Bibliografia

- **Cormen** — T. Cormen, C. Leiserson, R. Rivest, C. Stein. _Introduction to Algorithms_, 4.ª ed.,
  MIT Press, 2022. Capítulos 2, 6, 7, 8.
- **Sedgewick** — R. Sedgewick, K. Wayne. _Algorithms_, 4.ª ed., Addison-Wesley, 2011. Capítulo 2.
- **Knuth** — D. Knuth. _The Art of Computer Programming_, Vol. 3: _Sorting and Searching_, 2.ª ed., 1998.
