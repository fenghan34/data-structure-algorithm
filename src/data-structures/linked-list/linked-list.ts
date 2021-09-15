import { defaultEquals, EqualsFn } from '../../utils'

/**
 * 链表节点
 */
export class LinkedListNode<T> {
  constructor(public element: T, public next?: LinkedListNode<T>) {}
}

/**
 * 链表
 */
export class LinkedList<T> {
  protected count = 0

  protected head?: LinkedListNode<T>

  constructor(protected equalsFn: EqualsFn<T> = defaultEquals) {}

  /** 向尾部添加元素 */
  push(element: T): void {
    const node = new LinkedListNode(element)

    if (!this.head) {
      // 空链表
      this.head = node
    } else {
      // 非空链表

      let current = this.head
      while (current.next) {
        current = current.next
      }

      current.next = node
    }

    this.count++
  }

  /** 根据索引取出元素 */
  getElementAt(index: number): LinkedListNode<T> | undefined {
    let pos = index

    if (pos >= 0 && pos <= this.count) {
      let current = this.head

      while (pos--) {
        current = current.next
      }

      return current
    }

    return undefined
  }

  /** 根据索引移除元素 */
  removeAt(index: number): T | undefined {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        this.head = current.next
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

  /** 在任意位置插入元素 */
  insert(element: T, index: number): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new LinkedListNode(element)

      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
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

  /** 返回元素在链表中的索引 */
  indexOf(element: T): number {
    let current = this.head
    let index = 0
    while (current) {
      if (this.equalsFn(current.element, element)) {
        return index
      }
      current = current.next
      index++
    }

    return -1
  }

  /** 从链表中删除一个元素 */
  remove(element: T): T {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  isEmpty(): boolean {
    return this.count === 0
  }

  size(): number {
    return this.count
  }

  clear(): void {
    this.head = undefined
    this.count = 0
  }

  getHead(): LinkedListNode<T> {
    return this.head
  }

  toString(): string {
    if (!this.head) return ''

    let current = this.head
    let str = `${current.element}`

    while (current.next) {
      str += `,${current.next.element}`
      current = current.next
    }

    return str
  }
}
