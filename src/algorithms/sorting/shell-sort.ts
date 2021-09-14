import { Compare, CompareFn, defaultCompare } from '../../utils'

/**
 * 希尔排序 时间复杂度 O(nlog2(n)) 空间复杂度 O(1)
 * @param array 排序数组
 * @param compareFn 比较函数
 * @returns 排序后的数组
 */
export const shellSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  for (let gap = array.length >> 1; gap > 0; gap >>= 1) {
    for (let i = gap; i < array.length; i++) {
      const temp = array[i]
      let j = i - gap

      while (j >= 0 && compareFn(array[j], temp) === Compare.BIGGER_THAN) {
        array[j + gap] = array[j]
        j -= gap
      }

      array[j + gap] = temp
    }
  }

  return array
}
