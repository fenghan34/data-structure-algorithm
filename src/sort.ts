import { Compare, CompareFn, defaultCompare, swap } from './utils/index'

/**
 * 冒泡排序 时间复杂度 O(n^2) 空间复杂度 O(n)
 * @param array 排序数组
 * @param compareFn 比较函数
 */
export const bubbleSort = <T = number>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  const length = array.length

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (compareFn(array[j] as T, array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}

/**
 * 选择排序 时间复杂度 O(n^2) 空间复杂度 O(n)
 * @param 排序数组
 * @param compareFn 比较函数
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

/**
 * 插入排序 时间复杂度 O(n^2) 空间复杂度 O(n)
 * @param 排序数组
 * @param compareFn 比较函数
 */
export const insertionSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  // 1.从第一个元素开始，该元素可以认为已经被排序
  // 2.取出下一个元素，在已经排序的元素序列中从后向前扫描
  // 3.如果该元素（已排序）大于新元素，将该元素移到下一位置
  // 4.重复步骤 3，直到找到已排序的元素小于或者等于新元素的位置
  // 5.将新元素插入到该位置后
  // 6.重复步骤 2~5

  const length = array.length
  let temp: T

  for (let i = 1; i < length; i++) {
    let j = i // 记录已排序元素位置
    temp = array[i] // 待插入的新元素

    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      // 如果当前已排序元素大于新元素，将该元素移到下一位置
      array[j] = array[j - 1]
      j--
    }

    // 插入新元素
    array[j] = temp
  }

  return array
}
