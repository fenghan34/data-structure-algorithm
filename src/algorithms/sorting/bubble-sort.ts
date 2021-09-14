import { Compare, CompareFn, defaultCompare, swap } from '../../utils'

/**
 * 冒泡排序 时间复杂度 O(n^2) 空间复杂度 O(n)
 * @param array 排序数组
 * @param compareFn 比较函数
 * @returns 排序后的数组
 */
export const bubbleSort = <T = number>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  const { length } = array

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (compareFn(array[j] as T, array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}
