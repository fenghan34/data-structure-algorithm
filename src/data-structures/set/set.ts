/**
 * 集合
 */
export class Set<T> {
  protected items: any

  constructor(iterable?: Iterable<T>) {
    this.items = {}

    if (iterable[Symbol.iterator]) {
      Array.from(iterable).forEach((v: T) => this.add(v))
    }
  }

  /** 迭代协议 */
  *[Symbol.iterator](): Iterator<T> {
    return yield* this.values()
  }

  add(element: T) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }

    return false
  }

  has(element: T) {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  delete(element: T) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }

    return false
  }

  clear() {
    this.items = {}
  }

  get size() {
    return Object.keys(this.items).length
  }

  values(): T[] {
    return Object.values(this.items)
  }

  keys(): string[] {
    return Object.keys(this.items)
  }

  entries(): [string, T][] {
    return Object.entries(this.items)
  }

  toString() {
    if (this.size === 0) {
      return ''
    }

    const values = this.values()
    let objString = `${values[0]}`

    for (let i = 1; i < values.length; i++) {
      objString = `${objString},${values[i].toString()}`
    }

    return objString
  }

  /** 计算与另一个集合的并集 */
  union(otherSet: Set<T>) {
    return new Set<T>([...this, ...otherSet])
  }

  /** 计算与另一个集合的交集 */
  intersection(otherSet: Set<T>) {
    let smallerSet = otherSet
    let biggerSet: Set<T> = this

    if (otherSet.size > this.size) {
      biggerSet = otherSet
      smallerSet = this
    }

    return new Set([...smallerSet].filter((v) => biggerSet.has(v)))
  }

  /** 计算与另一个集合的差集 */
  difference(otherSet: Set<T>) {
    return new Set([...this].filter((v) => !otherSet.has(v)))
  }

  /** 判断是否是另一个集合的子集 */
  isSubSetOf(otherSet: Set<T>): boolean {
    if (this.size > otherSet.size) return false

    return [...this].every((v) => otherSet.has(v))
  }
}

Object.defineProperty(Set.prototype, Symbol.toStringTag, { value: 'MySet' })
