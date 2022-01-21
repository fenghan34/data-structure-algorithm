import {
  bubbleSort,
  bucketSort,
  countingSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
  selectionSort,
  shellSort,
} from '.'

describe('Sorting', () => {
  const testSortAlgorithm = (
    algorithm: (...args: any[]) => unknown,
    ...rest: any[]
  ): void => {
    const arr1 = [1]
    const res1 = [1]

    const arr2 = [4, 5, 3, 1, 2]
    const res2 = [1, 2, 3, 4, 5]

    const arr3 = [5, 4, 3, 2, 1]
    const res3 = res2

    const arr4 = [4, 4, 3, 3, 2, 2, 1, 1]
    const res4 = [1, 1, 2, 2, 3, 3, 4, 4]

    const arr5 = [78, 20, 5, 60, 1000]
    const res5 = [5, 20, 60, 78, 1000]

    expect(algorithm(arr1, ...rest)).toEqual(res1)
    expect(algorithm(arr2, ...rest)).toEqual(res2)
    expect(algorithm(arr3, ...rest)).toEqual(res3)
    expect(algorithm(arr4, ...rest)).toEqual(res4)
    expect(algorithm(arr5, ...rest)).toEqual(res5)
  }

  it('should return an sorted array', () => {
    expect.hasAssertions()

    testSortAlgorithm(bubbleSort)
    testSortAlgorithm(selectionSort)
    testSortAlgorithm(insertionSort)
    testSortAlgorithm(mergeSort)
    testSortAlgorithm(quickSort)
    testSortAlgorithm(countingSort)
    testSortAlgorithm(bucketSort, 5)
    testSortAlgorithm(radixSort)
    testSortAlgorithm(heapSort)
    testSortAlgorithm(shellSort)
  })
})
