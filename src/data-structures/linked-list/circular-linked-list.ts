import { defaultEquals, EqualsFn } from '../../utils'
import { LinkedList, LinkedListNode } from './linked-list'

/**
 * 循环链表
 */
export class CircularLinkedList<T> extends LinkedList<T> {
  constructor(protected equalsFn: EqualsFn<T> = defaultEquals) {
    super(equalsFn)
  }

  /** 向尾部添加元素 */
  push(element: T) {
    const node = new LinkedListNode(element)

    if (!this.head) {
      // 空链表
      this.head = node
      node.next = this.head
    } else {
      // 非空链表

      let count = this.count
      let current = this.head
      while (--count) {
        current = current.next
      }

      current.next = node
      node.next = this.head
    }

    this.count++
  }

  /** 在任意位置插入元素 */
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new LinkedListNode(element)

      if (index === 0) {
        if (!this.head) {
          this.head = node
          node.next = this.head
        } else {
          const current = this.head
          node.next = current
          this.head = node
          const tail = this.getElementAt(this.count - 1)
          tail.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }

      this.count++
      return true
    }

    return false
  }

  /** 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        if (this.count === 1) {
          this.head = null
        } else {
          const tail = this.getElementAt(this.count - 1)
          this.head = current.next
          tail.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }

      this.count--
      return current.element
    }

    return undefined
  }
}
