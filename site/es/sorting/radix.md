# Ordenamiento radix

## Idea

Se ordenan los números **dígito a dígito, empezando por el menos significativo** (LSD — least
significant digit). Cada pasada es un ordenamiento **estable** por un dígito: un ordenamiento por
conteo con solo 10 valores posibles. Como cada pasada es estable, el orden establecido por los
dígitos menos significativos se mantiene entre los números con el mismo dígito más significativo.
Tras la pasada por el dígito más significativo, el array está ordenado.

Los números negativos se ordenan aparte por su valor absoluto y se colocan delante en orden inverso.

## Ejemplo

Ordenamos `[170, 45, 75, 90, 802, 24, 2, 66]`. El dígito de la pasada actual está en **negrita**; en
la última pasada se muestran ceros a la izquierda para mayor claridad.

| Pasada   | Array tras la pasada                                                   |
| -------- | ---------------------------------------------------------------------- |
| entrada  | 170, 45, 75, 90, 802, 24, 2, 66                                        |
| unidades | 17**0**, 9**0**, 80**2**, **2**, 2**4**, 4**5**, 7**5**, 6**6**        |
| decenas  | 8**0**2, **0**2, **2**4, **4**5, **6**6, 1**7**0, **7**5, **9**0       |
| centenas | **0**02, **0**24, **0**45, **0**66, **0**75, **0**90, **1**70, **8**02 |

Fíjate en 170 y 75 tras la pasada por las decenas: ambos tienen 7 decenas, y 170 sigue antes que 75
porque estaba antes tras la pasada por las unidades (0 < 5). Por eso cada pasada tiene que ser
estable.

## Pseudocódigo

```text
RADIX-SORT(A)                          // enteros no negativos
  max = maximum of A
  place = 1
  while ⌊max / place⌋ > 0
    stable COUNTING-SORT of A by digit ⌊A[i] / place⌋ mod 10
    place = place × 10
```

## Complejidad

| Mejor       | Promedio    | Peor        | Memoria  | Estable | En el lugar |
| ----------- | ----------- | ----------- | -------- | ------- | ----------- |
| O(d(n + b)) | O(d(n + b)) | O(d(n + b)) | O(n + b) | sí      | no          |

- `d` — número de dígitos del mayor valor absoluto, `b = 10` — la base. Para números con un número
  limitado de dígitos el tiempo es **lineal** en n.
- A diferencia del ordenamiento por conteo, la memoria no depende del rango de valores:
  `[0, 1 000 000 000]` necesita 10 pasadas, no mil millones de contadores.
- **Solo enteros** (hasta `Number.MAX_SAFE_INTEGER`); cualquier otro valor lanza un `TypeError`.

## Cuándo usarlo

Muchos enteros con un número limitado de dígitos: identificadores, marcas de tiempo, códigos
postales. También para cadenas de la misma longitud (ordenando por caracteres en lugar de dígitos) y
como idea para ordenar claves compuestas por varios campos.

## Uso

```ts
import { radixSort } from 'ts-ds';

const ids = [170, 45, 75, -90, 802, 24, 2, 66];
radixSort(ids); // [-90, 2, 24, 45, 66, 75, 170, 802]
```

[Referencia de la API](/api/functions/radixSort)

## Bibliografía

- Las máquinas tabuladoras de H. Hollerith (década de 1890) ordenaban tarjetas perforadas así.
- Cormen, §8.3 "Radix sort".
- Sedgewick, _Algorithms_, §5.1 "String sorts" (radix LSD y MSD).
