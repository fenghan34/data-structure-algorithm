import { DoublyLinkedList } from '../linked-list/doubly-linked-list'

/**
 * 使用链表实现栈
 */
export class StackLinkedList<T> {
  private items: DoublyLinkedList<T>

  constructor() {
    this.items = new DoublyLinkedList<T>()
  }

  push(element: T): void {
    this.items.push(element)
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }

    return this.items.removeAt(this.size() - 1)
  }

  peek(): T {
    return this.items.getTail().element
  }

  size(): number {
    return this.items.size()
  }

  isEmpty(): boolean {
    return this.items.isEmpty()
  }
}
