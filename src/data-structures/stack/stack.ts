/**
 * 栈
 */
export class Stack<E> {
  private items: Record<number, E> = {}

  private count = 0

  size(): number {
    return this.count
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  clear(): void {
    this.items = {}
    this.count = 0
  }

  toString(): string {
    if (this.isEmpty()) return ''

    let str = ''

    for (let i = 0; i < this.count; i++) {
      str += this.items[i]
    }

    return str
  }

  push(element: E): void {
    this.items[this.count++] = element
  }

  pop(): E | undefined {
    if (this.isEmpty()) return undefined

    this.count--
    const item = this.items[this.count]
    delete this.items[this.count]
    return item
  }

  peek(): E | undefined {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
}
