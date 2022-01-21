import {
  Compare,
  CompareFn,
  defaultCompare,
  defaultDiff,
  DiffFn,
} from '../../utils'

/**
 * 插值搜索 时间复杂度 O(log(log(n))) 空间复杂度 O(1)
 * @param array 数组
 * @param value 要搜索的值
 * @param compareFn 比较函数
 * @returns 位置
 */
export const interpolationSearch = <T>(
  array: T[],
  value: T,
  compareFn: CompareFn<T> = defaultCompare,
  diffFn: DiffFn<T> = defaultDiff
): number => {
  let left = 0
  let right = array.length - 1
  let delta = -1
  let position = -1

  while (left <= right) {
    // 插值 = (查询值 -­ 最小值) / (最大值 -­ 最小值)
    delta = diffFn(value, array[left]) / diffFn(array[right], array[left])

    position = left + ~~((right - left) * delta)

    if (position < left || position > right) break

    if (compareFn(array[position], value) === Compare.EQUAL) {
      return position
    }

    if (compareFn(array[position], value) === Compare.LESS_THAN) {
      left = position + 1
    } else {
      right = position - 1
    }
  }

  return -1
}
