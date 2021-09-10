import { Compare, CompareFn, defaultCompare, swap } from '../../utils'

/**
 * 选择排序 时间复杂度 O(n^2) 空间复杂度 O(n)
 * @param array 排序数组
 * @param compareFn 比较函数
 * @returns 排序后的数组
 */
export const selectionSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  const length = array.length
  let minIndex: number

  for (let i = 0; i < length - 1; i++) {
    minIndex = i

    for (let j = i; j < length; j++) {
      if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
        minIndex = j
      }
    }

    if (i !== minIndex) {
      swap(array, i, minIndex)
    }
  }

  return array
}
