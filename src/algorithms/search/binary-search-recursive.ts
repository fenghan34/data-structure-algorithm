import { Compare, CompareFn, defaultCompare } from '../../utils'

const binarySearchRecursiveInner = <T>(
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
      return binarySearchRecursiveInner(array, value, mid + 1, high, compareFn)
    }
    if (compareRes === Compare.BIGGER_THAN) {
      return binarySearchRecursiveInner(array, value, low, mid - 1, compareFn)
    }
    return mid
  }

  return -1
}

/**
 * 二分搜索 时间复杂度 O(log(n)) 空间复杂度 O(1)
 * @param array 已排序数组
 * @param value 要搜索的值
 * @param compareFn 比较函数
 * @returns 位置
 */
export const binarySearchRecursive = <T>(
  array: T[],
  value: T,
  compareFn: CompareFn<T> = defaultCompare
): number => {
  const low = 0
  const high = array.length - 1

  return binarySearchRecursiveInner(array, value, low, high, compareFn)
}
