import {
  Compare,
  CompareFn,
  defaultCompare,
  defaultEquals,
  EqualsFn,
} from '../../utils'
import { LinkedList } from './linked-list'

/**
 * 有序链表
 */
export class SortedLinkedList<T> extends LinkedList<T> {
  constructor(
    protected equalsFn: EqualsFn<T> = defaultEquals,
    protected compareFn: CompareFn<T> = defaultCompare
  ) {
    super(equalsFn)
  }

  push(element: T): void {
    if (this.isEmpty()) {
      super.push(element)
    } else {
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }

  insert(element: T): boolean {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }

    const index = this.getIndexNextSortedElement(element)
    return super.insert(element, index)
  }

  /** 获取排序后的插入位置 */
  private getIndexNextSortedElement(element: T): number {
    let current = this.head
    let index = 0

    while (
      current &&
      this.compareFn(element, current.element) === Compare.BIGGER_THAN
    ) {
      current = current.next
      index++
    }

    return index
  }
}
