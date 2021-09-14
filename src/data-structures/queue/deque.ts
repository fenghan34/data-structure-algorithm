/**
 * 双端队列
 */
export class Deque<T> {
  count = 0

  lowestCount = 0

  items: Record<number, T> = {}

  size(): number {
    return this.count - this.lowestCount
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  clear(): void {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  toString(): string {
    if (this.isEmpty()) return ''

    let str = `${this.items[this.lowestCount]}`

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      str += this.items[i]
    }

    return str
  }

  addFront(element: T): void {
    if (this.isEmpty()) {
      // 空队列
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      // 第一个元素索引不为 0
      this.items[--this.lowestCount] = element
    } else {
      // 第一个元素索引为 0
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }

      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }

  addBack(element: T): void {
    this.items[this.count++] = element
  }

  removeFront(): T | undefined {
    if (this.isEmpty()) return undefined

    const item = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return item
  }

  removeBack(): T | undefined {
    if (this.isEmpty()) return undefined

    const item = this.items[this.count - 1]
    delete this.items[this.count - 1]
    this.count--
    return item
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) return undefined
    return this.items[this.lowestCount]
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) return undefined
    return this.items[this.count - 1]
  }
}
