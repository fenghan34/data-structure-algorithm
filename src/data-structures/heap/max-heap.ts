import { CompareFn, defaultCompare, reverseCompare } from '../../utils'
import { MinHeap } from './min-heap'

/**
 * 最大堆
 */
export class MaxHeap<T> extends MinHeap<T> {
  constructor(
    protected compareFn: CompareFn<T> = reverseCompare(defaultCompare)
  ) {
    super(compareFn)
  }

  /** 找出最大值 */
  findMaximum(): T | undefined {
    return super.findMinimum()
  }
}
