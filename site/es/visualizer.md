# Visualizador

Elige un algoritmo y los datos y pulsa **«Iniciar»** o avanza paso a paso. La línea resaltada del
pseudocódigo es la que se está ejecutando. Las barras amarillas se
están comparando y las rojas acaban de cambiar. Los contadores muestran cuánto trabajo ha hecho ya el
algoritmo — compáralos entre algoritmos con los mismos datos.

<ClientOnly>
  <SortVisualizer />
</ClientOnly>

## Carrera

Dos algoritmos con los mismos datos, paso a paso. Prueba quicksort contra burbuja con 60 elementos —
así se ve la diferencia entre O(n log n) y O(n²).

<ClientOnly>
  <SortRace />
</ClientOnly>

Cada paso viene del código real de la biblioteca, registrado con [`trace`](./guide/tracing).
