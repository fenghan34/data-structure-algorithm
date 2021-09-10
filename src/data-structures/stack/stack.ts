/**
 * 栈
 */
export class Stack<E> {
  private items: Record<number, E> = {}
  private count: number = 0

  size() {
    return this.count
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.items = {}
    this.count = 0
  }

  toString() {
    if (this.isEmpty()) return ''

    let str = ''

    for (let i = 0; i < this.count; i++) {
      str += this.items[i]
    }

    return str
  }

  push(element: E) {
    this.items[this.count++] = element
  }

  pop() {
    if (this.isEmpty()) return undefined

    this.count--
    const item = this.items[this.count]
    delete this.items[this.count]
    return item
  }

  peek() {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
}
