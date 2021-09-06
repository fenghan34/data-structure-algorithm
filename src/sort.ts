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

/**
 * 归并排序 时间复杂度 O(nlog(n)) 空间复杂度 O(n)
 * @param 排序数组
 * @param compareFn 比较函数
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

/**
 * 归并操作 将两个有序数组进行有序合并
 */
const merge = <T>(left: T[], right: T[], compareFn: CompareFn<T>): T[] => {
  const result: T[] = []
  let i = 0
  let j = 0

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
 * 快速排序 时间复杂度 O(nlog(n)) 空间复杂度
 * @param 排序数组
 * @param compareFn 比较函数
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
 * @param array
 * @param left
 * @param right
 * @param compareFn
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
