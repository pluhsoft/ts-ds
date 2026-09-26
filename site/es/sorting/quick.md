# Ordenamiento rápido (quicksort)

## Idea

**Divide y vencerás**, pero el trabajo se hace _antes_ de la recursión:

1. Se elige un **pivote**.
2. **Partición**: se reorganiza el array para que los elementos no mayores que el pivote queden
   antes de él y los no menores, después. El pivote queda en su posición definitiva.
3. Se ordenan ambas partes recursivamente.

A diferencia del ordenamiento por mezcla, no hace falta mezclar nada ni usar un array adicional.

Esta implementación sigue a Hoare y Sedgewick:

- **Pivote mediana de tres** — la mediana del primer elemento, el del medio y el último. En arrays
  ordenados e invertidos elige la verdadera mediana, así que pasan a ser el mejor caso en lugar del
  peor.
- **Partición de Hoare** — dos índices avanzan uno hacia el otro e intercambian los elementos que
  están en el lado equivocado. Ambos se detienen en elementos iguales al pivote, así que muchos
  duplicados se reparten de forma equilibrada.
- **Recursión en la parte menor**, un bucle para la mayor — la pila de llamadas nunca supera
  O(log n).

## Ejemplo

Ordenamos `[5, 2, 4, 6, 1, 3]`.

**Pivote.** El primero, el del medio y el último son 5, 4, 3; su mediana **4** pasa al principio:
`4, 2, 3, 6, 1, 5`.

**Partición alrededor de 4** — `i` avanza a la derecha mientras los elementos sean menores que 4,
`j` retrocede a la izquierda mientras sean mayores que 4:

| Paso                          | Array                    | Comentario                  |
| ----------------------------- | ------------------------ | --------------------------- |
| inicio                        | 4, 2, 3, 6, 1, 5         | pivote 4 en la posición 0   |
| `i` se detiene en 6, `j` en 1 | 4, 2, 3, **6**, **1**, 5 | ambos en el lado equivocado |
| intercambio                   | 4, 2, 3, 1, 6, 5         |                             |
| los índices se cruzan         | 4, 2, 3, **1**, 6, 5     | `j` = 3                     |
| pivote ↔ A[j]                 | 1, 2, 3, **4**, 6, 5     | el 4 está en su sitio       |

**Recursión.** `[1, 2, 3]` y `[6, 5]` se ordenan igual: `1, 2, 3, 4, 5, 6`.

## Pseudocódigo

```text
QUICK-SORT(A, low, high)
  while low < high
    p = PARTITION(A, low, high)
    if p − low < high − p              // recursión en la parte menor
      QUICK-SORT(A, low, p − 1)
      low = p + 1
    else
      QUICK-SORT(A, p + 1, high)
      high = p − 1

PARTITION(A, low, high)                // Hoare, como en Sedgewick
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

## Complejidad

| Mejor      | Promedio   | Peor  | Memoria  | Estable | En el lugar |
| ---------- | ---------- | ----- | -------- | ------- | ----------- |
| O(n log n) | O(n log n) | O(n²) | O(log n) | no      | sí          |

- **En promedio**: si el pivote divide el array en proporciones razonables, la profundidad de la
  recursión es O(log n) y cada nivel hace O(n) de trabajo. Con datos aleatorios y pivote aleatorio,
  quicksort hace unas $1{,}39\, n \log_2 n$ comparaciones; con la mediana de tres, menos.
- **El peor caso** O(n²) ocurre cuando el pivote es siempre el menor o el mayor elemento. ¡Con el
  pivote "último elemento" eso es exactamente un array ordenado! La mediana de tres resuelve los
  datos ordenados, invertidos e iguales (las pruebas de la biblioteca comprueban ≤ 1,5 n log₂ n
  comparaciones en ellos), pero siguen existiendo entradas construidas a propósito
  ("median-of-three killers"). Cormen evita el problema con alta probabilidad eligiendo el pivote al
  azar.
- **Memoria** O(log n) para la pila de llamadas gracias a la recursión en la parte menor.
- **No es estable**: la partición intercambia elementos lejanos.

## Cuándo usarlo

Es, en la práctica, el ordenamiento por comparación de uso general más rápido: pocos movimientos de
datos y buen uso de la caché. Si necesitas estabilidad u O(n log n) garantizado, elige el
ordenamiento por mezcla; introsort (quicksort que cambia a montículos cuando la recursión es
demasiado profunda) combina las ventajas de ambos.

## Uso

```ts
import { quickSort } from 'ts-ds';

const words = ['pera', 'higo', 'plátano', 'kiwi'];
quickSort(words, (a, b) => a.length - b.length);
```

[Referencia de la API](/api/functions/quickSort)

## Bibliografía

- C. A. R. Hoare. "Quicksort". _The Computer Journal_ 5(1), 1962.
- Cormen, capítulo 7 "Quicksort" (partición de Lomuto, versión aleatorizada, análisis).
- Sedgewick, _Algorithms_, §2.3 "Quicksort" (partición de Hoare, mediana de tres).
- D. Musser. "Introspective Sorting and Selection Algorithms", 1997.
