/**
 * 队列
 */
export class Queue<T> {
  private count = 0

  private lowestCount = 0

  private items: Record<number, T> = {}

  size(): number {
    return this.count - this.lowestCount
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  clear(): void {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  toString(): string {
    if (this.size() === 0) return ''

    let str = `${this.items[this.lowestCount]}`

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      str += `,${this.items[i]}`
    }

    return str
  }

  peek(): T {
    return this.items[this.lowestCount]
  }

  /** 入队 */
  enqueue(element: T): void {
    this.items[this.count++] = element
  }

  /** 出队 */
  dequeue(): T {
    const item = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return item
  }
}
