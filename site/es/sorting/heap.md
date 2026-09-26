# Ordenamiento por montículos (heapsort)

## Idea

Un **montículo binario de máximos** (max-heap) es un array visto como un árbol binario completo: los
hijos de `A[i]` son `A[2i + 1]` y `A[2i + 2]`, y cada padre no es menor que sus hijos. Por eso el
elemento mayor siempre está en la raíz `A[0]`.

1. **Construir un montículo** a partir del array.
2. Intercambiar la raíz (el máximo) con el último elemento del montículo — el máximo queda en su
   posición definitiva. Reducir el montículo en uno y **hundir** la nueva raíz para restaurar la
   propiedad de montículo.
3. Repetir hasta que el montículo quede vacío.

## Ejemplo

Ordenamos `[5, 2, 4, 6, 1, 3]`.

**1. Construir el montículo de máximos** — hundir cada padre, del último a la raíz:

```text
      5                5                6
    /   \            /   \            /   \
   2     4    →     6     4    →     5     4
  / \   /          / \   /          / \   /
 6   1 3          2   1 3          2   1 3
```

El montículo como array: `6, 5, 4, 2, 1, 3`.

**2. Extraer el máximo** una y otra vez. La cola ordenada está en **negrita**:

| Paso | Intercambiar raíz y último | Después de hundir    |
| ---- | -------------------------- | -------------------- |
| 1    | 3, 5, 4, 2, 1, **6**       | 5, 3, 4, 2, 1, **6** |
| 2    | 1, 3, 4, 2, **5, 6**       | 4, 3, 1, 2, **5, 6** |
| 3    | 2, 3, 1, **4, 5, 6**       | 3, 2, 1, **4, 5, 6** |
| 4    | 1, 2, **3, 4, 5, 6**       | 2, 1, **3, 4, 5, 6** |
| 5    | 1, **2, 3, 4, 5, 6**       | **1, 2, 3, 4, 5, 6** |

## Pruébalo

El mismo ejemplo, paso a paso. Cambia los datos o pulsa «Iniciar».

<ClientOnly>
  <SortVisualizer algorithm="heap" :input="[5, 2, 4, 6, 1, 3]" />
</ClientOnly>

## Pseudocódigo

```text
HEAP-SORT(A)
  for i = ⌊n / 2⌋ − 1 downto 0          // construir el montículo
    SIFT-DOWN(A, i, n)
  for end = n − 1 downto 1
    swap A[0] and A[end]
    SIFT-DOWN(A, 0, end)

SIFT-DOWN(A, i, size)                   // el montículo es A[0..size − 1]
  loop
    largest = i
    l = 2i + 1, r = 2i + 2
    if l < size and A[l] > A[largest]: largest = l
    if r < size and A[r] > A[largest]: largest = r
    if largest = i: return
    swap A[i] and A[largest]
    i = largest
```

## Complejidad

| Mejor      | Promedio   | Peor       | Memoria | Estable | En el lugar |
| ---------- | ---------- | ---------- | ------- | ------- | ----------- |
| O(n log n) | O(n log n) | O(n log n) | O(1)    | no      | sí          |

- **Construir el montículo cuesta solo O(n)**, no O(n log n): la mayoría de los nodos están abajo y
  se hunden pocos niveles ($\sum_h \frac{n}{2^{h+1}} \cdot h = O(n)$).
- Cada una de las n − 1 extracciones se hunde como mucho $\log_2 n$ niveles: O(n log n) en total,
  **para cualquier entrada**.
- **Memoria** O(1): el montículo vive dentro del propio array.
- **No es estable**: intercambiar la raíz con el último elemento lleva elementos lejos.

## Cuándo usarlo

Cuando se necesita O(n log n) **garantizado** y **sin memoria adicional**. En la práctica es más
lento que quicksort porque salta por el array (mala localidad de caché). El mismo montículo es la
base de una **cola de prioridad**.

## Uso

```ts
import { heapSort } from 'ts-ds';

const array = [5, 2, 4, 6, 1, 3];
heapSort(array);
```

[Referencia de la API](/api/functions/heapSort)

## Bibliografía

- J. W. J. Williams. "Algorithm 232: Heapsort". _Communications of the ACM_ 7(6), 1964.
- Cormen, capítulo 6 "Heapsort".
- Sedgewick, _Algorithms_, §2.4 "Priority queues".
