import { defaultToString } from '../../utils'
import { ValuePair } from '../dictionary/dictionary'
import { LinkedList } from '../linked-list/linked-list'

export type TableValue<K, V> = ValuePair<K, V> & LinkedList<ValuePair<K, V>>

export interface Table<K, V> {
  [key: string]: TableValue<K, V>
}

/**
 * 散列表
 */
export class HashTable<K, V> {
  protected table: Table<K, V> = {}

  protected count = 0

  constructor(protected toStrFn: (key: K) => string = defaultToString) {}

  /** 散列函数 */
  protected loseloseHashCode(key: K): number {
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
      this.table[pos] = new ValuePair(key, value) as TableValue<K, V>
      this.count++

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
      this.count--
      return true
    }

    return false
  }

  getTable(): Table<K, V> {
    return this.table
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  size(): number {
    return this.count
  }

  clear(): void {
    this.table = {}
    this.count = 0
  }

  /** 字符串序列化 */
  toString(): string {
    if (this.isEmpty()) return ''

    const keys = Object.keys(this.table)
    let str = `${keys[0]} => ${this.table[keys[0]].toString()}`

    for (let i = 1; i < keys.length; i++) {
      str += `,${keys[i]} => ${this.table[keys[i]].toString()}`
    }

    return str
  }
}
