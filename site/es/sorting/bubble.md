# Ordenamiento de burbuja

## Idea

Se recorre el array y se intercambia cada par de vecinos que esté en el orden incorrecto. Tras la
primera pasada, el elemento mayor ha "subido como una burbuja" hasta el final; tras la segunda, el
segundo mayor está en su sitio, y así sucesivamente. Si una pasada no hace intercambios, el array
está ordenado.

## Ejemplo

Ordenamos `[5, 2, 4, 6, 1, 3]`. La cola ordenada está en **negrita**.

| Pasada | Array tras la pasada | Qué ocurrió                                |
| ------ | -------------------- | ------------------------------------------ |
| 1      | 2, 4, 5, 1, 3, **6** | el 6 subió hasta el final (4 intercambios) |
| 2      | 2, 4, 1, 3, **5, 6** | el 5 en su sitio (2 intercambios)          |
| 3      | 2, 1, 3, **4, 5, 6** | el 4 en su sitio (2 intercambios)          |
| 4      | 1, **2, 3, 4, 5, 6** | el 3 y el 2 en su sitio (1 intercambio)    |
| 5      | **1, 2, 3, 4, 5, 6** | sin intercambios — fin                     |

15 comparaciones, 9 intercambios. El número de intercambios es igual al número de _inversiones_ —
pares que están desordenados.

## Pruébalo

El mismo ejemplo, paso a paso. Cambia los datos o pulsa «Iniciar».

<ClientOnly>
  <SortVisualizer algorithm="bubble" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocódigo

```text
BUBBLE-SORT(A)
  for pass = 0 to n − 2
    swapped = false
    for i = 0 to n − pass − 2
      if A[i] > A[i + 1]
        swap A[i] and A[i + 1]
        swapped = true
    if not swapped
      return
```

## Complejidad

| Mejor | Promedio | Peor  | Memoria | Estable | En el lugar |
| ----- | -------- | ----- | ------- | ------- | ----------- |
| O(n)  | O(n²)    | O(n²) | O(1)    | sí      | sí          |

- **Peor caso** (array en orden inverso): pasadas de n − 1, n − 2, …, 1 comparaciones —
  $\frac{n(n-1)}{2}$ en total, y cada comparación termina en intercambio.
- **Mejor caso** (ya ordenado): una pasada de n − 1 comparaciones sin intercambios — gracias a la
  variable `swapped`.
- **Estable**: solo se intercambian vecinos cuyo elemento izquierdo es estrictamente mayor, así que
  los iguales nunca se adelantan entre sí.

## Cuándo usarlo

En la práctica casi nunca — el ordenamiento por inserción es igual de sencillo y más rápido. El
valor de la burbuja está en ser el primer algoritmo: muestra qué significan "ordenado", "pasada",
"intercambio" e "inversión".

## Uso

```ts
import { bubbleSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
bubbleSort(array);
bubbleSort(array, (a, b) => b - a); // orden descendente
```

[Referencia de la API](/api/functions/bubbleSort)

## Bibliografía

- Knuth, _TAOCP_ Vol. 3, §5.2.2 "Sorting by exchanging".
- Cormen, problema 2-2 "Correctness of bubblesort".
