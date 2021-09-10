import { DoublyLinkedList } from '../linked-list/doubly-linked-list'

/**
 * 使用链表实现栈
 */
export class StackLinkedList<T> {
  private items: DoublyLinkedList<T>

  constructor() {
    this.items = new DoublyLinkedList<T>()
  }

  push(element: any) {
    this.items.push(element)
  }

  pop() {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items.removeAt(this.size() - 1)
  }

  peek() {
    return this.items.getTail().element
  }

  size() {
    return this.items.size()
  }

  isEmpty() {
    return this.items.isEmpty()
  }
}
