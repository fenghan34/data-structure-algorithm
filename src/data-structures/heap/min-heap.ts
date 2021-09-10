import { Compare, CompareFn, defaultCompare, swap } from '../../utils/index'

/**
 * 最小堆
 */
export class MinHeap<T> {
  protected heap: T[] = []

  constructor(protected compareFn: CompareFn<T> = defaultCompare) {}

  /** 获取左侧子节点 index */
  private getLeftIndex(index: number) {
    return 2 * index + 1
  }

  /** 获取右侧子节点 index */
  private getRightIndex(index: number) {
    return 2 * index + 2
  }

  /** 获取父节点 index */
  private getParentIndex(index: number) {
    if (index === 0) return undefined

    return ~~((index - 1) / 2)
  }

  /** 插入新值 */
  insert(value: T) {
    if (value != null) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  /** 上移操作，直到不存在父节点大于插入的新值 */
  private siftUp(index: number) {
    let parentIndex = this.getParentIndex(index)

    while (
      index > 0 &&
      this.compareFn(this.heap[parentIndex], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap(this.heap, parentIndex, index)
      index = parentIndex
      parentIndex = this.getParentIndex(index)
    }
  }

  /** 堆大小 */
  size() {
    return this.heap.length
  }

  /** 堆是否为空 */
  isEmpty() {
    return this.size() === 0
  }

  /** 找出最小值 */
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  /** 移除最小值 */
  extract() {
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

  /** 下移操作（堆化） */
  private siftDown(index: number) {
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
