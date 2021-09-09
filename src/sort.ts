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
 * 希尔排序 时间复杂度 O(nlog2(n)) 空间复杂度 O(1)
 * @param array 排序数组
 * @param compareFn 比较函数
 */
export const shellSort = <T>(
  array: T[],
  compareFn: CompareFn<T> = defaultCompare
): T[] => {
  for (let gap = array.length >> 1; gap > 0; gap >>= 1) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i]
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

/**
 * 计数排序 时间复杂度 O(n + k) 空间复杂度 O(n + k)
 * @param array 待排序整数数组
 */
export const countingSort = (array: number[]): number[] => {
  if (array.length < 2) return array

  const counts = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    counts[element] >= 1 ? counts[element]++ : (counts[element] = 1)
  }

  let index = 0
  for (let j = 0; j < counts.length; j++) {
    let count = counts[j]

    while (count > 0) {
      array[index++] = j
      count--
    }
  }

  return array
}

/**
 * 桶排序 平均时间复杂度 O(n + k)  空间复杂度 O(n * k)
 * @param array 待排序整数数组
 * @param num 桶数量
 */
export const bucketSort = (array: number[], num: number) => {
  const max = Math.max(...array)
  const min = Math.min(...array)

  const buckets: number[][] = []
  // 每个桶大小
  const bucketsSize = Math.floor((max - min) / num) + 1

  for (let i = 0; i < array.length; i++) {
    const bucketIndex = ~~(array[i] / bucketsSize)

    if (!buckets[bucketIndex]) {
      buckets[bucketIndex] = []
    }

    const bucket = buckets[bucketIndex]
    bucket.push(array[i])

    // 每次插入后排序
    let l = bucket.length - 1
    while (l > 0) {
      if (bucket[l] < bucket[l - 1]) {
        swap(bucket, l, l - 1)
      }
      l--
    }
  }

  const sortedArray = []
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] && sortedArray.push(...buckets[i])
  }

  return sortedArray
}

/**
 * 基数排序 时间复杂度 O(k * n) 空间复杂度 O(k + n)
 * @param array 待排序数组
 * @param radixBase 基数，默认 10
 */
export const radixSort = (array: number[], radixBase = 10): number[] => {
  if (array.length < 2) {
    return array
  }

  const minValue = Math.min(...array)
  const maxValue = Math.max(...array)

  let significantDigit = 1
  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue)
    significantDigit *= radixBase
  }

  return array
}

/**
 * 基于基数排序
 * @param array 原数组
 * @param radixBase 基数
 * @param significantDigit 当前有效位
 * @param minValue 最小值
 */
const countingSortForRadix = (
  array: number[],
  radixBase: number,
  significantDigit: number,
  minValue: number
): number[] => {
  let bucketIndex
  const buckets = []
  const aux = []

  for (let i = 0; i < radixBase; i++) {
    // 基于基数初始化桶
    buckets[i] = 0
  }

  for (let i = 0; i < array.length; i++) {
    // 基于当前有效位进行计数排序
    bucketIndex = ~~(((array[i] - minValue) / significantDigit) % radixBase)
    buckets[bucketIndex]++
  }

  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1]
  }

  for (let i = array.length - 1; i >= 0; i--) {
    bucketIndex = ~~(((array[i] - minValue) / significantDigit) % radixBase)
    aux[--buckets[bucketIndex]] = array[i]
  }

  return aux
}

/**
 * 堆排序算法 时间复杂度 O(nlog(n)) 空间复杂度 O(n)
 * @param array 原数组
 * @param compareFn 比较函数
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
