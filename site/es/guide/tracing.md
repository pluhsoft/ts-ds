# Trazado y metadatos

## Cada paso de un algoritmo

`trace` ejecuta cualquier función de ordenamiento y registra cada comparación y cada cambio del
array — sin modificar el algoritmo. Es la base de las visualizaciones y una herramienta práctica para
las prácticas de laboratorio: contar comparaciones, comprobar un trazado hecho a mano, comparar
algoritmos con los mismos datos.

```ts
import { bubbleSort, trace } from 'ts-ds';

const { input, output, steps, stats } = trace(bubbleSort, [3, 1, 2]);

output; // [1, 2, 3] — el array de entrada no se modifica
stats; // { comparisons: 3, reads: 10, writes: 4, swaps: 2 }
steps;
// [
//   { type: 'compare', values: [3, 1], indices: [0, 1], result: 1 },
//   { type: 'swap', i: 0, j: 1 },
//   { type: 'compare', values: [3, 2], indices: [1, 2], result: 1 },
//   { type: 'swap', i: 1, j: 2 },
//   { type: 'compare', values: [1, 2], indices: [0, 1], result: -1 },
// ]
```

Hay tres tipos de pasos:

| Paso      | Significado                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `compare` | Se llamó al comparador con `values`; `indices` son sus posiciones en el array.                                                 |
| `swap`    | Se intercambiaron los elementos de las posiciones `i` y `j`.                                                                   |
| `write`   | Se escribió `value` en la posición `index` (un desplazamiento en inserción, un paso de mezcla, …); `previous` es lo que había. |

## Reproducir

`replay(input, steps, count)` devuelve el array tras los primeros `count` pasos — cada fotograma de
una animación:

```ts
import { replay } from 'ts-ds';

replay(input, steps, 0); // [3, 1, 2]
replay(input, steps, 2); // [1, 3, 2] — tras el primer intercambio
replay(input, steps); // [1, 2, 3]
```

## Comparar algoritmos

`sortingAlgorithms` describe cada algoritmo: nombre, complejidad, estabilidad y si ordena en el
lugar. Junto con `trace`, da una tabla comparativa en pocas líneas:

```ts
import { sortingAlgorithms, trace } from 'ts-ds';

const data = [5, 2, 4, 6, 1, 3];
for (const algorithm of sortingAlgorithms) {
  if (algorithm.kind === 'comparison') {
    const { stats } = trace(algorithm.sort, data);
    console.log(algorithm.name, algorithm.complexity.average, stats.comparisons, stats.swaps);
  }
}
```

| Algoritmo  | Promedio   | Comparaciones | Intercambios | Escrituras |
| ---------- | ---------- | ------------- | ------------ | ---------- |
| Burbuja    | O(n²)      | 15            | 9            | 18         |
| Selección  | O(n²)      | 15            | 3            | 6          |
| Inserción  | O(n²)      | 12            | 0            | 14         |
| Shell      | O(n^1.25)  | 11            | 0            | 12         |
| Mezcla     | O(n log n) | 16            | 0            | 16         |
| Rápido     | O(n log n) | 21            | 9            | 22         |
| Montículos | O(n log n) | 16            | 11           | 22         |

Con seis elementos los algoritmos "rápidos" todavía no son más rápidos — la diferencia aparece en
arrays grandes. Prueba con `n = 1000`.

## Cómo funciona

El array se envuelve en un [`Proxy`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
que ve cada lectura y escritura, y el comparador en una función que cuenta las llamadas. Los
algoritmos son exactamente las mismas funciones que importas, así que el trazado muestra lo que
realmente ocurre — y sin `trace` funcionan sin ningún coste adicional.

Limitaciones:

- Los `indices` de una comparación quedan vacíos cuando un valor no viene directamente del array:
  quicksort compara con un pivote guardado y el ordenamiento por mezcla con elementos de su búfer.
- El ordenamiento por conteo y radix trabajan en arrays auxiliares; el trazado solo muestra cómo se
  escribe el resultado de vuelta.

[Referencia de la API: trace](/api/functions/trace) · [replay](/api/functions/replay) ·
[sortingAlgorithms](/api/variables/sortingAlgorithms)
