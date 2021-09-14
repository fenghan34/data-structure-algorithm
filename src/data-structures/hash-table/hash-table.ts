import { defaultToString } from '../../utils'
import { ValuePair } from '../dictionary/dictionary'

/**
 * 散列表
 */
export class HashTable<K, V> {
  private table: { [key: string]: ValuePair<K, V> } = {}

  constructor(private toStrFn: (key: K) => string = defaultToString) {}

  /** 散列函数 */
  private loseloseHashCode(key: K): number {
    if (typeof key === 'number') {
      return key
    }

    const tableKey = this.toStrFn(key)
    let hash = 0

    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }

    return hash % 37
  }

  hashCode(key: K): number {
    return this.loseloseHashCode(key)
  }

  /** 将键和值加入散列表 */
  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key)
      this.table[pos] = new ValuePair(key, value)

      return true
    }

    return false
  }

  /** 从散列表中获取一个值 */
  get(key: K): V {
    const valuePair = this.table[this.hashCode(key)]
    return valuePair?.value
  }

  /** 从散列表中移除一个值 */
  remove(key: K): boolean {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]

    if (valuePair) {
      delete this.table[hash]
      return true
    }

    return false
  }

  /** 字符串序列化 */
  toString(): string {
    const keys = Object.keys(this.table)
    if (keys.length === 0) return ''

    let str = `${keys[0]} => ${this.table[keys[0]].toString()}`

    for (let i = 1; i < keys.length; i++) {
      str += `\n${keys[i]} => ${this.table[keys[i]].toString()}`
    }

    return str
  }
}
