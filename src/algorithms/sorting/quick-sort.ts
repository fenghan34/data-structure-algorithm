import { Compare, CompareFn, defaultCompare, swap } from '../../utils'

/**
 * 快速排序 时间复杂度 O(nlog(n)) 空间复杂度 O(log(n))
 * @param array 排序数组
 * @param compareFn 比较函数
 * @returns 排序后的数组
 */
export const quickSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  return quick(array, 0, array.length - 1, compareFn)
}

/**
 * 快速排序
 * @param array 待排序数组
 * @param left 左指针
 * @param right 右指针
 * @param compareFn 比较函数
 */
const quick = <T>(
  array: T[],
  left: number,
  right: number,
  compareFn: CompareFn<T>
) => {
  let index
  if (array.length > 1) {
    // 拆分位置
    index = partition(array, left, right, compareFn)

    if (left < index - 1) {
      // 比基准值小的值组成的新数组
      quick(array, left, index - 1, compareFn)
    }

    if (right > index) {
      // 比基准值大的值组成的新数组
      quick(array, index, right, compareFn)
    }
  }

  return array
}

/**
 * 划分操作
 * @param array 排序数组
 * @param left 左指针
 * @param right 右指针
 * @param compareFn 比较函数
 * @returns 新的划分位置
 */
const partition = <T>(
  array: T[],
  left: number,
  right: number,
  compareFn: CompareFn<T>
): number => {
  // 选择基准值，这里是中间的值
  const pivot = array[~~((left + right) / 2)]

  let i = left
  let j = right

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++
    }

    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--
    }

    if (i < j) {
      swap(array, i++, j--)
    } else if (i === j) {
      i++
      j--
    }
  }

  return i
}
