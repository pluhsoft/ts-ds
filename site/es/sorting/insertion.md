# Ordenamiento por inserción

## Idea

Así ordena la mayoría de la gente las cartas de una mano: se toma la siguiente carta y se inserta en
su sitio entre las que ya están ordenadas. El prefijo `A[0..i−1]` siempre está ordenado; el paso `i`
inserta `A[i]` en él desplazando los elementos mayores una posición a la derecha.

## Ejemplo

Ordenamos `[5, 2, 4, 6, 1, 3]` — el ejemplo de Cormen. El prefijo ordenado está en **negrita**.

| Paso | Insertado | Array tras el paso   | Desplazamientos |
| ---- | --------- | -------------------- | --------------- |
| 1    | 2         | **2, 5**, 4, 6, 1, 3 | 1               |
| 2    | 4         | **2, 4, 5**, 6, 1, 3 | 1               |
| 3    | 6         | **2, 4, 5, 6**, 1, 3 | 0               |
| 4    | 1         | **1, 2, 4, 5, 6**, 3 | 4               |
| 5    | 3         | **1, 2, 3, 4, 5, 6** | 3               |

12 comparaciones, 9 desplazamientos — de nuevo, el número de inversiones.

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

## Complejidad

| Mejor | Promedio | Peor  | Memoria | Estable | En el lugar |
| ----- | -------- | ----- | ------- | ------- | ----------- |
| O(n)  | O(n²)    | O(n²) | O(1)    | sí      | sí          |

- El tiempo de ejecución es O(n + I), donde I es el número de inversiones. Un array ordenado tiene 0
  inversiones (O(n)), uno invertido tiene $\frac{n(n-1)}{2}$ (O(n²)), uno aleatorio unas
  $\frac{n^2}{4}$.
- **Adaptativo**: cuanto más cerca de estar ordenado está el array, más rápido funciona.
- **Estable**: un elemento se detiene en el primero que no es mayor, así que nunca adelanta a uno
  igual.
- **En línea**: puede ordenar los datos a medida que llegan.

## Cuándo usarlo

Arrays pequeños (hasta unas decenas de elementos) y datos casi ordenados. Por eso los algoritmos
híbridos rápidos — TimSort en `Array.prototype.sort`, introsort en C++ — cambian a inserción para
los trozos pequeños.

## Uso

```ts
import { insertionSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
insertionSort(array);
```

[Referencia de la API](/api/functions/insertionSort)

## Bibliografía

- Cormen, §2.1 "Insertion sort" y §2.2 "Analyzing algorithms".
- Knuth, _TAOCP_ Vol. 3, §5.2.1.
