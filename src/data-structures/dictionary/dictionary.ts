import { defaultToString } from '../../utils'

/**
 * 字典值
 */
export class ValuePair<K, V> {
  constructor(public key: K, public value: V) {}

  toString(): string {
    return `${this.key}:${this.value}`
  }
}

/**
 * 字典
 */
export class Dictionary<K, V> {
  private table: { [key: string]: ValuePair<K, V> } = {}

  constructor(private toStrFn: (key: K) => string = defaultToString) {}

  /** 检测一个键是否存在于字典中 */
  hasKey(key: K): boolean {
    return this.table[this.toStrFn(key)] != null
  }

  /** 向字典中添加元素 */
  set(key: K, value: V): boolean {
    if (key != null && value != null) {
      const tableKey: string = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }

    return false
  }

  /** 从字典中移除一个值 */
  remove(key: K): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  /** 从字典中检索一个值 */
  get(key: K): V {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair?.value
  }

  /** 获取字典中所有的 valuePair 对象 */
  keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table)
  }

  /** 获取字典中所有原始键名，也就是 valuePair 对象的 key 属性 */
  keys(): K[] {
    return this.keyValues().map((v) => v.key)
  }

  /** 获取字典中所有值，也就是 valuePair 对象的 value 属性 */
  values(): V[] {
    return this.keyValues().map((v) => v.value)
  }

  /** 迭代方法 */
  forEach(callback: (key: K, value: V) => unknown): void {
    const valuePairs = this.keyValues()

    for (let i = 0; i < valuePairs.length; i++) {
      const result = callback(valuePairs[i].key, valuePairs[i].value)
      if (result === false) {
        break
      }
    }
  }

  /** 获取字典大小 */
  size(): number {
    return Object.keys(this.table).length
  }

  /** 检测字典是否为空字典 */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /** 清空字典 */
  clear(): void {
    this.table = {}
  }

  /** 字符串序列化 */
  toString(): string {
    if (this.isEmpty()) return ''

    const valuePairs = this.keyValues()
    let str = `${valuePairs[0].toString()}`

    for (let i = 1; i < valuePairs.length; i++) {
      str += `${valuePairs[i].toString()}`
    }

    return str
  }
}
