# Ordenamiento por selección

## Idea

Se busca el elemento más pequeño y se coloca primero. Después se busca el más pequeño entre los
restantes y se coloca segundo. Se repite hasta que todo el array esté en orden. El array se divide
en un prefijo ordenado y un sufijo sin ordenar; cada paso mueve un elemento del sufijo al final del
prefijo.

## Ejemplo

Ordenamos `[5, 2, 4, 6, 1, 3]`. El prefijo ordenado está en **negrita**.

| Paso | Mínimo del resto         | Array tras el paso   |
| ---- | ------------------------ | -------------------- |
| 1    | 1 → intercambio con el 5 | **1**, 2, 4, 6, 5, 3 |
| 2    | 2 → ya está en su sitio  | **1, 2**, 4, 6, 5, 3 |
| 3    | 3 → intercambio con el 4 | **1, 2, 3**, 6, 5, 4 |
| 4    | 4 → intercambio con el 6 | **1, 2, 3, 4**, 5, 6 |
| 5    | 5 → ya está en su sitio  | **1, 2, 3, 4, 5, 6** |

15 comparaciones y solo 3 intercambios.

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

## Complejidad

| Mejor | Promedio | Peor  | Memoria | Estable | En el lugar |
| ----- | -------- | ----- | ------- | ------- | ----------- |
| O(n²) | O(n²)    | O(n²) | O(1)    | no      | sí          |

- Siempre exactamente $\frac{n(n-1)}{2}$ comparaciones: para encontrar el mínimo hay que mirar todos
  los elementos restantes, sean cuales sean los datos.
- Como mucho n − 1 intercambios — menos que cualquier otro algoritmo de aquí. Útil cuando escribir
  es mucho más caro que leer (por ejemplo, en memoria flash).
- **No es estable**: un intercambio lejano puede saltar por encima de un elemento igual. En
  `[2a, 2b, 1]` el primer paso intercambia `2a` y `1`, y se obtiene `[1, 2b, 2a]`.

## Cuándo usarlo

Cuando importa más el número de escrituras que el de comparaciones, o como ejemplo didáctico del
invariante "prefijo ordenado + sufijo sin ordenar".

## Uso

```ts
import { selectionSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
selectionSort(array);
```

[Referencia de la API](/api/functions/selectionSort)

## Bibliografía

- Knuth, _TAOCP_ Vol. 3, §5.2.3 "Sorting by selection".
- Sedgewick, _Algorithms_, §2.1.
