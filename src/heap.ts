import {
  Compare,
  CompareFn,
  defaultCompare,
  reverseCompare,
  swap,
} from './utils/index'

/**
 * 最小堆类
 */
export class MinHeap<T> {
  compareFn: CompareFn<T>
  heap: T[]
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.heap = []
  }

  /* 获取左侧子节点 index */
  getLeftIndex(index: number): number {
    return 2 * index + 1
  }

  /* 获取右侧子节点 index */
  getRightIndex(index: number): number {
    return 2 * index + 2
  }

  /* 获取父节点 index */
  getParentIndex(index: number): number | undefined {
    if (index === 0) return undefined

    return ~~((index - 1) / 2)
  }

  /* 插入新值 */
  insert(value: T): boolean {
    if (value != null) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  /* 上移操作，直到不存在父节点大于插入的新值 */
  siftUp(index: number) {
    let parentIndex = this.getParentIndex(index) as number

    while (
      index > 0 &&
      this.compareFn(this.heap[parentIndex], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap<T>(this.heap, parentIndex, index)
      index = parentIndex
      parentIndex = this.getParentIndex(index) as number
    }
  }

  /* 堆大小 */
  size() {
    return this.heap.length
  }

  /* 堆是否为空 */
  isEmpty() {
    return this.size() === 0
  }

  /* 找出最小值 */
  findMinimum(): T | undefined {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  /* 移除最小值 */
  extract(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    if (this.size() === 1) {
      return this.heap.shift()
    }

    const removedValue = this.heap.shift()
    this.siftDown(0)
    return removedValue
  }

  /* 下移操作（堆化） */
  siftDown(index: number) {
    // 先找到最大值与最小值替换，再逐级往下比较进行替换操作，直至形成新的二叉堆

    let element = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()

    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      element = left
    }

    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      element = right
    }

    if (index !== element) {
      swap(this.heap, index, element)
      this.siftDown(element)
    }
  }
}

/**
 * 最大堆类
 */
export class MaxHeap<T> extends MinHeap<T> {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }
}

/**
 * 堆排序算法
 * @param array 数字数组
 * @param compareFn 对比函数
 * @returns 由大到小排列的数字数组
 */
export function heapSort(array: number[], compareFn = defaultCompare) {
  let heapSize = array.length

  buildMaxHeap(array, compareFn)

  while (heapSize > 1) {
    swap(array, 0, --heapSize)
    heapify(array, 0, heapSize, compareFn)
  }

  return array
}

/**
 * 构建最大堆
 */
function buildMaxHeap(array: number[], compareFn: CompareFn) {
  for (let i = ~~(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length, compareFn)
  }
}

/**
 * 下移操作
 */
function heapify(
  array: number[],
  index: number,
  heapSize: number,
  compareFn: CompareFn
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
