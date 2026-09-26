# Primeros pasos

## Instalación

```bash
npm install ts-ds
```

El paquete no tiene dependencias. Funciona en Node.js 18+ y en cualquier bundler, con módulos ES y
CommonJS.

## Tu primer ordenamiento

```ts
import { quickSort } from 'ts-ds';

const numbers = [5, 2, 4, 6, 1, 3];
quickSort(numbers);
console.log(numbers); // [1, 2, 3, 4, 5, 6]
```

::: warning Ordenar modifica el array
Todas las funciones de ordenamiento ordenan el array **en el lugar** y no devuelven nada (`void`).
Es la misma convención que `list.sort()` en Python o `Arrays.sort()` en Java: una función o bien
modifica los datos o bien devuelve un resultado, nunca ambas cosas
([separación de comandos y consultas](https://es.wikipedia.org/wiki/Separaci%C3%B3n_de_comandos_y_consultas)).

```ts
const sorted = quickSort(numbers); // error de TypeScript: quickSort devuelve void
```

Para conservar el array original, ordena una copia:

```ts
const copy = [...numbers];
quickSort(copy);
```

:::

## Orden personalizado

Los ordenamientos por comparación aceptan un comparador opcional, exactamente como
`Array.prototype.sort`: devuelve un número negativo si `a` va primero, un número positivo si `b` va
primero y `0` si son iguales.

```ts
import { mergeSort } from 'ts-ds';

const people = [
  { name: 'Ana', age: 30 },
  { name: 'Bruno', age: 20 },
  { name: 'Eva', age: 30 },
];

mergeSort(people, (a, b) => a.age - b.age);
// Bruno (20), Ana (30), Eva (30) — el ordenamiento por mezcla es estable: Ana sigue antes que Eva

mergeSort(people, (a, b) => b.age - a.age); // orden descendente
```

Sin comparador, los valores se ordenan de forma ascendente con `<`. Las cadenas se comparan por
unidades de código UTF-16 (`'B' < 'a'`); para el orden alfabético usa
`(a, b) => a.localeCompare(b)`. `NaN` queda al final.

## Formas de importar

```ts
import { quickSort, heapSort } from 'ts-ds'; // funciones individuales
import { sort } from 'ts-ds'; // todos los algoritmos: sort.quick, sort.heap, …
import { quickSort } from 'ts-ds/sort'; // solo ordenamiento
const { quickSort } = require('ts-ds'); // CommonJS
```

Con importaciones con nombre, el bundler descarta los algoritmos que no usas. El objeto `sort` es
cómodo para experimentos y comparaciones, pero siempre incluye todos los algoritmos.

## Siguientes pasos

- [Ordenamiento: resumen y comparación](/es/sorting/) — qué algoritmo elegir y por qué.
- [Referencia de la API](/api/) — todas las funciones y tipos (en inglés).
