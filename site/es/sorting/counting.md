# Ordenamiento por conteo

## Idea

Si los valores son enteros de un rango pequeño, ni siquiera hace falta compararlos. Se cuenta
cuántas veces aparece cada valor y luego se calcula, para cada valor, cuántos elementos **no son
mayores** que él — es exactamente su última posición en el array ordenado.

Con `k = max − min + 1` valores posibles:

1. `count[v]` — cuántas veces aparece `v`.
2. **Sumas acumuladas**: `count[v] = count[0] + … + count[v]` — cuántos elementos son ≤ `v`.
3. Se recorre la entrada **desde el final** y se coloca cada valor en la posición `--count[v]`.
   Recorrer hacia atrás mantiene los valores iguales en su orden original — el ordenamiento es
   **estable**, y en eso se apoya radix.

## Ejemplo

Ordenamos `[2, 5, 3, 0, 2, 3, 0, 3]` — el ejemplo de Cormen (valores 0…5).

| Valor                      | 0   | 1   | 2   | 3   | 4   | 5   |
| -------------------------- | --- | --- | --- | --- | --- | --- |
| `count` (apariciones)      | 2   | 0   | 2   | 3   | 0   | 1   |
| `count` (sumas acumuladas) | 2   | 2   | 4   | 7   | 7   | 8   |

Colocando desde el final: el último `3` va a la posición `7 − 1 = 6`, el último `0` a `2 − 1 = 1`, el
siguiente `3` a `6 − 1 = 5`, y así sucesivamente. Resultado: `0, 0, 2, 2, 3, 3, 3, 5`.

## Pruébalo

El mismo ejemplo, paso a paso. Cambia los datos o pulsa «Iniciar».

<ClientOnly>
  <SortVisualizer algorithm="counting" :input="[2, 5, 3, 0, 2, 3, 0, 3]" />
</ClientOnly>

## Pseudocódigo

```text
COUNTING-SORT(A)
  min, max = minimum and maximum of A
  k = max − min + 1
  count[0..k − 1] = 0
  for each v in A
    count[v − min] = count[v − min] + 1
  for v = 1 to k − 1
    count[v] = count[v] + count[v − 1]
  for i = n − 1 downto 0
    v = A[i]
    count[v − min] = count[v − min] − 1
    B[count[v − min]] = v
  copy B to A
```

## Complejidad

| Mejor    | Promedio | Peor     | Memoria  | Estable | En el lugar |
| -------- | -------- | -------- | -------- | ------- | ----------- |
| O(n + k) | O(n + k) | O(n + k) | O(n + k) | sí      | no          |

- Tiempo lineal cuando `k = O(n)`. No contradice la cota inferior Ω(n log n): esa cota solo se
  aplica a algoritmos que comparan elementos.
- **Memoria** O(k) para los contadores — para valores como `[0, 1 000 000 000]` serían gigabytes. La
  biblioteca limita `k` a `COUNTING_SORT_MAX_RANGE` = 2²⁶ y por encima lanza un `RangeError`: para
  rangos amplios usa radix.
- **Solo enteros.** `1.5`, `NaN` o `Infinity` lanzan un `TypeError`. Los valores negativos se
  aceptan — se desplazan por `min`.

## Cuándo usarlo

Enteros (o claves que se convierten en enteros: edades, notas, bytes) en un rango no mucho mayor que
el número de elementos. Y como pieza del ordenamiento radix.

## Uso

```ts
import { countingSort } from 'ts-ds';

const grades = [7, 9, 6, 9, 5, 7, 10];
countingSort(grades); // [5, 6, 7, 7, 9, 9, 10]
```

[Referencia de la API](/api/functions/countingSort)

## Bibliografía

- H. H. Seward, 1954 (tesis de maestría, MIT).
- Cormen, §8.1 "Lower bounds for sorting" y §8.2 "Counting sort".
