/**
 * 队列
 */
export class Queue<T> {
  private count: number = 0
  private lowestCount: number = 0
  private items: Record<number, T> = {}

  size() {
    return this.count - this.lowestCount
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  toString() {
    let str = this.items[this.lowestCount] + ''

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      str += this.items[i]
    }

    return str
  }

  peek() {
    return this.items[this.lowestCount]
  }

  /** 入队 */
  enQueue(element: T) {
    this.items[this.count++] = element
  }

  /** 出队 */
  deQueue() {
    const item = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return item
  }
}
