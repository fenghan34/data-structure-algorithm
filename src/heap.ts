import { Compare, CompareFn, defaultCompare, swap } from './utils/index'

/**
 * 最小堆类
 */
class MinHeap<T> {
  compareFn: CompareFn
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

    return ~~(index - 1) / 2
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
    let parentIndex = this.getParentIndex(index)

    while (
      index > 0 &&
      this.compareFn(this.heap[parentIndex], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap<T>(this.heap, parentIndex, index)
      index = parentIndex
      parentIndex = this.getParentIndex(index)
    }
  }

  /* 移除最小值 */
  extract(): T {}

  /* 找出最小值 */
  findMinimum(): T {}
}
