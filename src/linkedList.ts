interface LinkedListType {
  push: (element: any) => void
  getElementAt: (index: number) => any
  removeAt: (index: number) => any
  insert: (element: any, index?: number) => boolean
  indexOf: (element: any) => number
  remove: (element: any) => NodeType
  isEmpty: () => boolean
  size: () => number
  getHead: () => NodeType | null | undefined
  getTail?: () => NodeType
  toString: () => string
}

type NodeType = {
  element: any
  prev?: NodeType | undefined | null
  next: NodeType | undefined | null
}

/**
 * 普通链表
 */
class LinkedList implements LinkedListType {
  protected count: number = 0
  protected head: NodeType | null | undefined = null

  /* 向尾部添加元素 */
  push(element: any) {
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

  /* 根据索引取出元素 */
  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      while (index--) {
        current = current?.next
      }

      return current
    }

    return undefined
  }

  /* 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        this.head = current?.next
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        previous!.next = current?.next
      }

      this.count--
      return current?.element
    }

    return undefined
  }

  /* 在任意位置插入元素 */
  insert(element: any, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new LinkedListNode(element)

      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous?.next
        previous!.next = node
      }

      this.count++
      return true
    }

    return false
  }

  /* 返回元素在链表中的索引 */
  indexOf(element: any) {
    let current = this.head
    let index = 0
    while (current) {
      if (current.element === element) {
        return index
      }
      current = current.next
      index++
    }

    return -1
  }

  /* 从链表中删除一个元素 */
  remove(element: any) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }

  getHead() {
    return this.head
  }

  toString() {
    if (!this.head) return ''

    let str = ''
    let current = this.head
    while (current) {
      str += current.element
      current = current.next!
    }

    return str
  }
}

/**
 * 链表节点类
 */
class LinkedListNode implements NodeType {
  element: any
  next: NodeType | null | undefined = null
  constructor(element: any) {
    this.element = element
  }
}

/**
 * 双向链表节点类
 */
class DoublyLinkedListNode extends LinkedListNode {
  prev: NodeType | null = null
}

/**
 * 双向链表类
 */
class DoublyLinkedList extends LinkedList {
  protected tail: NodeType | null | undefined = null

  /* 向尾部添加元素 */
  push(element: any) {
    const node = new DoublyLinkedListNode(element)

    if (!this.head) {
      // 空链表
      this.head = node
      this.tail = node
    } else {
      // 非空链表
      const current = this.tail as DoublyLinkedListNode
      current.next = node
      node.prev = current
      this.tail = node
    }

    this.count++
  }

  /* 根据索引取出元素 */
  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      if (index === 0) {
        return this.head
      } else if (index === this.count - 1) {
        return this.tail
      } else {
        // 根据 index 位置推断遍历起点，优化速度
        const fromHead = index < ((this.count / 2) ^ (1 - 1)) ? true : false
        let current = fromHead ? this.head : this.tail
        let count = fromHead ? index : this.count - index - 1

        while (count--) {
          current = current![fromHead ? 'next' : 'prev']
        }

        return current
      }
    }

    return undefined
  }

  /* 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        this.head = current?.next

        if (this.count === 1) {
          // 如果只有一项
          this.tail = null
        } else {
          this.head!.prev = null
        }
      } else if (index === this.count - 1) {
        // 移除最后一项
        current = this.tail
        this.tail = current?.prev
        this.tail!.next = null
      } else {
        // 移除中间项
        current = this.getElementAt(index)
        const previous = current?.prev
        previous!.next = current?.next
        current!.next!.prev = previous
      }

      this.count--
      return current?.element
    }

    return undefined
  }

  /* 在任意位置插入元素 */
  insert(element: any, index: number) {
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
          current!.prev = node
          this.head = node
        }
      } else if (index === this.count) {
        // 尾部插入
        current = this.tail
        current!.next = node
        node.prev = current!
        this.tail = node
      } else {
        // 中间插入
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        previous!.next = node
        node.prev = previous!
        node.next = current
        current!.prev = node
      }

      this.count++
      return true
    }

    return false
  }

  getTail() {
    return this.tail
  }
}

/**
 * 循环链表类
 */
class CircularLinkedList extends LinkedList {
  /* 向尾部添加元素 */
  push(element: any) {
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
        current = current.next!
      }

      current.next = node
      node.next = this.head
    }

    this.count++
  }

  /* 在任意位置插入元素 */
  insert(element: any, index: number) {
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
          tail!.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous?.next
        previous!.next = node
      }

      this.count++
      return true
    }

    return false
  }

  /* 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        // 移除第一项
        if (this.count === 1) {
          this.head = null
        } else {
          const tail = this.getElementAt(this.count - 1)
          this.head = current?.next
          tail!.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous?.next
        previous!.next = current?.next
      }

      this.count--
      return current?.element
    }

    return undefined
  }
}

/**
 * 有序链表类
 */
class SortedLinkedList extends LinkedList {
  compareFn: (a: any, b: any) => -1 | 1
  constructor(compareFn: (a: any, b: any) => -1 | 1) {
    super()
    this.compareFn = compareFn
  }

  insert(element: any) {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }

    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }

  /* 获取排序后的插入位置 */
  protected getIndexNextSortedElement(element: any) {
    let current = this.head
    let index = 0

    while (current && this.compareFn(element, current.element) === 1) {
      current = current.next
      index++
    }

    return index
  }
}

/**
 * 使用链表实现栈
 */
class StackLinkedList {
  items: DoublyLinkedList
  constructor() {
    this.items = new DoublyLinkedList()
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
    return this.items.getTail()!.element
  }

  size() {
    return this.items.size()
  }

  isEmpty() {
    return this.items.isEmpty()
  }
}

export {
  LinkedList,
  DoublyLinkedList,
  CircularLinkedList,
  SortedLinkedList,
  StackLinkedList,
}
