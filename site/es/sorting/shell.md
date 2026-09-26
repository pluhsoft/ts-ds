# Ordenamiento Shell

## Idea

El ordenamiento por inserción es lento porque un elemento avanza solo una posición por
desplazamiento. Donald Shell (1959) propuso ordenar primero elementos alejados: ordenar cada
elemento `h`-ésimo (el array queda "h-ordenado"), después usar un `h` menor y terminar con `h = 1`
— el ordenamiento por inserción normal, que ahora es rápido porque cada elemento ya está cerca de su
sitio.

Esta implementación usa la **secuencia de saltos de Knuth** 1, 4, 13, 40, 121, … (`h = 3h + 1`),
empezando por el mayor salto menor que n/3.

## Ejemplo

Ordenamos `[9, 8, 3, 7, 5, 6, 4, 1, 2, 0]` (n = 10, saltos 4 y 1).

**Salto 4** — cuatro ordenamientos por inserción independientes en las posiciones `{0, 4, 8}`,
`{1, 5, 9}`, `{2, 6}`, `{3, 7}`:

| Grupo   | Antes   | Después |
| ------- | ------- | ------- |
| 0, 4, 8 | 9, 5, 2 | 2, 5, 9 |
| 1, 5, 9 | 8, 6, 0 | 0, 6, 8 |
| 2, 6    | 3, 4    | 3, 4    |
| 3, 7    | 7, 1    | 1, 7    |

Array: `2, 0, 3, 1, 5, 6, 4, 7, 9, 8` — cada elemento está a pocas posiciones de su sitio.

**Salto 1** — el ordenamiento por inserción termina con solo 6 desplazamientos (las 6 inversiones
restantes): `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`.

## Pseudocódigo

```text
SHELL-SORT(A)
  h = 1
  while h < ⌊n / 3⌋
    h = 3h + 1
  while h ≥ 1
    for i = h to n − 1            // ordenamiento por inserción con salto h
      key = A[i]
      j = i
      while j ≥ h and A[j − h] > key
        A[j] = A[j − h]
        j = j − h
      A[j] = key
    h = (h − 1) / 3
```

## Complejidad

| Mejor      | Promedio    | Peor     | Memoria | Estable | En el lugar |
| ---------- | ----------- | -------- | ------- | ------- | ----------- |
| O(n log n) | ≈ O(n^1.25) | O(n^1.5) | O(1)    | no      | sí          |

- La complejidad depende de la secuencia de saltos y sigue siendo un problema abierto. Para la
  secuencia de Knuth está demostrado el peor caso O(n^(3/2)) (Pratt, 1971); en promedio se observa
  alrededor de n^1.25.
- La secuencia original de Shell n/2, n/4, …, 1 es peor: O(n²) en el peor caso.
- **No es estable**: los saltos largos pueden llevar un elemento más allá de uno igual.

## Cuándo usarlo

Cuando se necesita algo mucho más rápido que los ordenamientos O(n²), pero sencillo, sin recursión y
sin memoria adicional — por ejemplo, en sistemas embebidos. En arrays grandes ganan los algoritmos
O(n log n).

## Uso

```ts
import { shellSort } from 'ts-ds';

const array = [9, 8, 3, 7, 5, 6, 4, 1, 2, 0];
shellSort(array);
```

[Referencia de la API](/api/functions/shellSort)

## Bibliografía

- D. L. Shell. "A high-speed sorting procedure". _Communications of the ACM_ 2(7), 1959.
- Knuth, _TAOCP_ Vol. 3, §5.2.1 "Shell's method".
- Sedgewick, _Algorithms_, §2.1.
