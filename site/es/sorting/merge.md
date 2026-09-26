# Ordenamiento por mezcla

## Idea

**Divide y vencerás**:

1. **Dividir** el array en dos mitades.
2. **Vencer** — ordenar cada mitad recursivamente (un array de un elemento ya está ordenado).
3. **Combinar** — _mezclar_ las dos mitades ordenadas: tomar una y otra vez el menor de los dos
   elementos del frente.

Mezclar dos listas ordenadas con n elementos en total requiere solo n − 1 comparaciones — y ese es
todo el truco.

## Ejemplo

Ordenamos `[5, 2, 4, 6, 1, 3]`:

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

La última mezcla paso a paso — se comparan los elementos del frente y se toma el menor:

| Izquierda   | Derecha     | Se toma | Resultado        |
| ----------- | ----------- | ------- | ---------------- |
| **2**, 4, 5 | **1**, 3, 6 | 1       | 1                |
| **2**, 4, 5 | **3**, 6    | 2       | 1, 2             |
| **4**, 5    | **3**, 6    | 3       | 1, 2, 3          |
| **4**, 5    | **6**       | 4       | 1, 2, 3, 4       |
| **5**       | **6**       | 5       | 1, 2, 3, 4, 5    |
| —           | 6           | 6       | 1, 2, 3, 4, 5, 6 |

## Pseudocódigo

```text
MERGE-SORT(A, low, high)
  if low ≥ high
    return
  mid = ⌊(low + high) / 2⌋
  MERGE-SORT(A, low, mid)
  MERGE-SORT(A, mid + 1, high)
  if A[mid] ≤ A[mid + 1]              // las mitades ya están en orden
    return
  MERGE(A, low, mid, high)

MERGE(A, low, mid, high)
  copy A[low..high] to B[low..high]
  i = low, j = mid + 1
  for k = low to high
    if i > mid:            A[k] = B[j], j = j + 1
    else if j > high:      A[k] = B[i], i = i + 1
    else if B[j] < B[i]:   A[k] = B[j], j = j + 1
    else:                  A[k] = B[i], i = i + 1   // en empate se toma el izquierdo: estable
```

## Complejidad

| Mejor | Promedio   | Peor       | Memoria | Estable | En el lugar |
| ----- | ---------- | ---------- | ------- | ------- | ----------- |
| O(n)  | O(n log n) | O(n log n) | O(n)    | sí      | no          |

- La recurrencia $T(n) = 2T(n/2) + \Theta(n)$ da $T(n) = \Theta(n \log n)$: el árbol de recursión
  tiene $\log_2 n$ niveles y en cada nivel se mezclan n elementos en total.
- La comprobación `A[mid] ≤ A[mid + 1]` evita mezclar mitades que ya están en orden, así que un
  array ordenado tarda O(n).
- **Memoria** O(n) para el búfer — un único búfer se crea una vez y se reutiliza.
- **Estable**: en caso de empate, la mezcla toma primero el elemento de la mitad izquierda.

## Cuándo usarlo

Cuando se necesita un ordenamiento **estable** u O(n log n) **garantizado**. También es la base del
ordenamiento externo (datos que no caben en memoria) y de TimSort, el algoritmo de
`Array.prototype.sort`.

## Uso

```ts
import { mergeSort } from 'ts-ds';

const tasks = [
  { title: 'B', priority: 2 },
  { title: 'A', priority: 1 },
  { title: 'C', priority: 2 },
];
mergeSort(tasks, (a, b) => a.priority - b.priority);
// A (1), B (2), C (2) — B sigue antes que C
```

[Referencia de la API](/api/functions/mergeSort)

## Bibliografía

- Cormen, §2.3 "Designing algorithms" (mezcla y divide y vencerás), capítulo 4 (recurrencias).
- Sedgewick, _Algorithms_, §2.2 "Mergesort".
- Knuth, _TAOCP_ Vol. 3, §5.2.4 "Sorting by merging".
