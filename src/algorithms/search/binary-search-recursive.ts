import { Compare, CompareFn, defaultCompare } from '../../utils'
import { quickSort } from '../sorting/quick-sort'

const binarySearchRecursive = <T>(
  array: T[],
  value: T,
  low: number,
  high: number,
  compareFn: CompareFn<T> = defaultCompare
): number => {
  if (low <= high) {
    const mid = ~~((low + high) / 2)
    const element = array[mid]
    const compareRes = compareFn(element, value)

    if (compareRes === Compare.LESS_THAN) {
      return binarySearchRecursive(array, value, mid + 1, high, compareFn)
    }
    if (compareRes === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, value, low, mid - 1, compareFn)
    }
    return mid
  }

  return -1
}

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
  const sortedArray = quickSort(array)
  const low = 0
  const high = sortedArray.length - 1

  return binarySearchRecursive(array, value, low, high, compareFn)
}
