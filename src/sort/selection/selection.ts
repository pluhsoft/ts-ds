export function selection(array: number[]): void {
  for (
    let choosenElement = 0;
    choosenElement < array.length - 1;
    choosenElement++
  ) {
    let indexMinNumber = choosenElement;
    for (
      let nextElement = choosenElement + 1;
      nextElement < array.length;
      nextElement++
    ) {
      const nextNumber = array[nextElement];
      if (nextNumber < array[indexMinNumber]) {
        indexMinNumber = nextElement;
      }
    }
    if (indexMinNumber !== choosenElement) {
      swapElements(array, indexMinNumber, choosenElement);
    }
  }
}

function swapElements(
  array: number[],
  indexFrom: number,
  indexTo: number,
): void {
  const temp = array[indexFrom];
  array[indexFrom] = array[indexTo];
  array[indexTo] = temp;
}
