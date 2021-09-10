import { Compare, CompareFn, defaultCompare, swap } from '../../utils'

/**
 * 堆排序算法 时间复杂度 O(nlog(n)) 空间复杂度 O(n)
 * @param array 原数组
 * @param compareFn 比较函数
 * @returns 排序后的数组
 */
export const heapSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  let heapSize = array.length

  // 构建最大堆
  for (let i = ~~(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length, compareFn)
  }

  while (heapSize > 1) {
    swap(array, 0, --heapSize)
    heapify(array, 0, heapSize, compareFn)
  }

  return array
}

/**
 * 下移操作
 */
function heapify<T>(
  array: T[],
  index: number,
  heapSize: number,
  compareFn: CompareFn<T>
) {
  let element = index
  const left = index * 2 + 1
  const right = index * 2 + 2

  if (
    left < heapSize &&
    compareFn(array[element], array[left]) === Compare.LESS_THAN
  ) {
    element = left
  }

  if (
    right < heapSize &&
    compareFn(array[element], array[right]) === Compare.LESS_THAN
  ) {
    element = right
  }

  if (index !== element) {
    swap(array, index, element)
    heapify(array, element, heapSize, compareFn)
  }
}
