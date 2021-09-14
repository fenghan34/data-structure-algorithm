import { Compare, CompareFn, defaultCompare } from '../../utils'

/**
 * 归并操作 将两个有序数组进行有序合并
 */
const merge = <T>(left: T[], right: T[], compareFn: CompareFn<T>): T[] => {
  const result: T[] = []
  const i = 0
  const j = 0

  while (i < left.length && j < right.length) {
    const temp =
      compareFn(left[i], right[j]) === Compare.LESS_THAN
        ? left.shift()
        : right.shift()

    result.push(temp as T)
  }

  return result.concat(left, right)
}

/**
 * 归并排序 时间复杂度 O(nlog(n)) 空间复杂度 O(n)
 * @param array 排序数组
 * @param compareFn 比较函数
 * @returns 排序后的数组
 */
export const mergeSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  if (array.length <= 1) return array

  // 分治法
  // 拆分
  const middleIndex = ~~(array.length / 2)
  const left = mergeSort(array.slice(0, middleIndex), compareFn)
  const right = mergeSort(array.slice(middleIndex), compareFn)

  // 合并
  return merge(left, right, compareFn)
}
