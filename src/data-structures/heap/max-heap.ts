import { CompareFn, reversedDefaultCompare } from '../../utils'
import { MinHeap } from './min-heap'

/**
 * 最大堆
 */
export class MaxHeap<T> extends MinHeap<T> {
  constructor(protected compareFn: CompareFn<T> = reversedDefaultCompare) {
    super(compareFn)
  }

  /** 找出最大值 */
  findMaximum(): T | undefined {
    return super.findMinimum()
  }
}
