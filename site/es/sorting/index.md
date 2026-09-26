# Algoritmos de ordenamiento

Ordenar es poner los elementos en orden. Parece sencillo, pero cada algoritmo equilibra de forma muy
distinta velocidad, memoria, estabilidad y simplicidad — por eso todo curso de algoritmos empieza
aquí.

## Comparación

| Algoritmo                | Mejor    | Promedio | Peor     | Memoria | Estable | En el lugar |
| ------------------------ | -------- | -------- | -------- | ------- | ------- | ----------- |
| [Burbuja](./bubble)      | n        | n²       | n²       | 1       | sí      | sí          |
| [Selección](./selection) | n²       | n²       | n²       | 1       | no      | sí          |
| [Inserción](./insertion) | n        | n²       | n²       | 1       | sí      | sí          |
| [Shell](./shell)         | n log n  | ≈ n^1.25 | n^1.5    | 1       | no      | sí          |
| [Mezcla](./merge)        | n        | n log n  | n log n  | n       | sí      | no          |
| [Rápido](./quick)        | n log n  | n log n  | n²       | log n   | no      | sí          |
| [Montículos](./heap)     | n log n  | n log n  | n log n  | 1       | no      | sí          |
| [Conteo](./counting)     | n + k    | n + k    | n + k    | n + k   | sí      | no          |
| [Radix](./radix)         | d(n + b) | d(n + b) | d(n + b) | n + b   | sí      | no          |

Todas las complejidades son O(…). `k` es el rango de valores, `d` el número de dígitos, `b` la base
(10).

## Ideas clave

**Los ordenamientos por comparación** (de burbuja a montículos) solo preguntan "¿`a` es menor que
`b`?". Cualquier algoritmo así necesita en el peor caso al menos $\log_2 n! \approx n \log_2 n$
comparaciones: hay $n!$ órdenes posibles y cada comparación, en el mejor de los casos, los divide a
la mitad. Así que O(n log n) es lo mejor posible — mezcla y montículos lo alcanzan siempre, el
rápido en promedio.

**El ordenamiento por conteo y radix** no comparan elementos: usan los propios valores como índices
del array. Así superan n log n — pero solo funcionan con enteros (o claves que puedan convertirse en
enteros).

**Estabilidad** — los elementos iguales conservan su orden original. Importa cuando se ordenan
registros por una clave y luego por otra: ordena a las personas por nombre y después, de forma
estable, por edad — las personas de la misma edad quedan en orden alfabético.

**En el lugar** — el algoritmo solo necesita O(1) (u O(log n)) de memoria adicional además del
array.

## Cuál elegir

| Situación                              | Elige                                         |
| -------------------------------------- | --------------------------------------------- |
| Uso general, el más rápido en promedio | [Rápido](./quick)                             |
| Debe ser estable o garantizar n log n  | [Mezcla](./merge)                             |
| n log n garantizado con memoria O(1)   | [Montículos](./heap)                          |
| Arrays pequeños o casi ordenados       | [Inserción](./insertion)                      |
| Enteros en un rango pequeño            | [Conteo](./counting)                          |
| Muchos enteros con pocos dígitos       | [Radix](./radix)                              |
| Aprender lo básico                     | [Burbuja](./bubble), [selección](./selection) |

En código JavaScript de producción, `Array.prototype.sort` (TimSort, un híbrido de mezcla e
inserción) suele ser la opción correcta. Esta biblioteca muestra cómo funcionan los algoritmos
clásicos y ofrece implementaciones fiables para cursos, experimentos y casos especiales.

## Bibliografía

- **Cormen** — T. Cormen, C. Leiserson, R. Rivest, C. Stein. _Introduction to Algorithms_, 4.ª ed.,
  MIT Press, 2022. Capítulos 2, 6, 7, 8.
- **Sedgewick** — R. Sedgewick, K. Wayne. _Algorithms_, 4.ª ed., Addison-Wesley, 2011. Capítulo 2.
- **Knuth** — D. Knuth. _The Art of Computer Programming_, Vol. 3: _Sorting and Searching_, 2.ª ed., 1998.
