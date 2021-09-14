import { CompareFn, defaultCompare, reverseCompare } from '../../utils'
import { MinHeap } from './min-heap'

/**
 * 最大堆
 */
export class MaxHeap<T> extends MinHeap<T> {
  constructor(protected compareFn: CompareFn<T> = defaultCompare) {
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }
}
