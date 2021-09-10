import { Compare, CompareFn, defaultCompare } from '../../utils'
import { quickSort } from '../sorting/quick-sort'

/**
 * 二分搜索 时间复杂度 O(log(n)) 空间复杂度 O(1)
 * @param array 数组
 * @param value 要搜索的值
 * @param compareFn 比较函数
 * @returns 位置
 */
export const binarySearch = <T>(
  array: T[],
  value: T,
  compareFn: CompareFn<T> = defaultCompare
): number => {
  const sortedArray = quickSort(array, compareFn)

  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const mid = ~~((left + right) / 2)
    const element = sortedArray[mid]

    if (compareFn(element, value) === Compare.LESS_THAN) {
      // 当前值小于要找的值
      left = mid + 1
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
      // 当前值大于要找的值
      right = mid - 1
    } else {
      return mid
    }
  }

  return -1
}
