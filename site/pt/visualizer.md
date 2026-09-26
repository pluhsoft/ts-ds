# Visualizador

Escolha um algoritmo e os dados e carregue em **«Iniciar»** ou avance passo a passo. A linha
destacada do pseudocódigo é a que está a ser executada. As barras
amarelas estão a ser comparadas, as vermelhas acabaram de mudar. Os contadores mostram quanto
trabalho o algoritmo já fez — compare-os entre algoritmos com os mesmos dados.

<ClientOnly>
  <SortVisualizer />
</ClientOnly>

## Corrida

Dois algoritmos com os mesmos dados, passo a passo. Experimente o quicksort contra a flutuação com 60
elementos — é esta a diferença entre O(n log n) e O(n²).

<ClientOnly>
  <SortRace />
</ClientOnly>

Cada passo vem do código real da biblioteca, registado com [`trace`](./guide/tracing).
