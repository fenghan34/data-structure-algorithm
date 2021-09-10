import { defaultEquals, EqualsFn } from '../../utils'
import { LinkedList, LinkedListNode } from './linked-list'

/**
 * 双向链表节点
 */
export class DoublyLinkedListNode<T> extends LinkedListNode<T> {
  constructor(
    public element: T,
    public prev?: DoublyLinkedListNode<T>,
    public next?: DoublyLinkedListNode<T>
  ) {
    super(element, next)
  }
}

/**
 * 双向链表
 */
export class DoublyLinkedList<T> extends LinkedList<T> {
  protected head?: DoublyLinkedListNode<T> = undefined
  protected tail?: DoublyLinkedListNode<T>

  constructor(protected equalsFn: EqualsFn<T> = defaultEquals) {
    super(equalsFn)
  }

  /** 向尾部添加元素 */
  push(element: T) {
    const node = new DoublyLinkedListNode(element)

    if (!this.head) {
      // 空链表
      this.head = node
      this.tail = node
    } else {
      // 非空链表
      const current = this.tail
      current.next = node
      node.prev = current
      this.tail = node
    }

    this.count++
  }

  /** 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        this.head = current.next

        if (this.count === 1) {
          // 如果只有一项
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if (index === this.count - 1) {
        // 移除最后一项
        current = this.tail
        this.tail = current.prev
        this.tail.next = null
      } else {
        // 移除中间项
        current = this.getElementAt(index)
        const previous = current.prev
        previous.next = current.next
        current.next.prev = previous
      }

      this.count--
      return current.element
    }

    return undefined
  }

  /** 在任意位置插入元素 */
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyLinkedListNode(element)
      let current = this.head

      if (index === 0) {
        // 开头插入
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = current
          current.prev = node
          this.head = node
        }
      } else if (index === this.count) {
        // 尾部插入
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        // 中间插入
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        previous.next = node
        node.prev = previous
        node.next = current
        current.prev = node
      }

      this.count++
      return true
    }

    return false
  }

  getTail() {
    return this.tail
  }

  clear() {
    super.clear()
    this.tail = undefined
  }

  inverseToString() {
    if (this.tail == null) {
      return ''
    }
    let objString = `${this.tail.element}`
    let previous = this.tail.prev
    while (previous != null) {
      objString = `${objString},${previous.element}`
      previous = previous.prev
    }
    return objString
  }
}
