import { defaultToString } from '../../utils'
import { ValuePair } from '../dictionary/dictionary'

/**
 * 线性探查法（非惰性）解决散列冲突
 */
export class HashMapLinearProbing<K, V> {
  protected table: { [key: string]: ValuePair<K, V> } = {}

  constructor(protected toStrFn: (key: K) => string = defaultToString) {}

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

  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key)
      if (!this.table[pos]) {
        this.table[pos] = new ValuePair(key, value)
      } else {
        let index = pos + 1
        while (this.table[index]) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
  }

  get(key: K): V {
    const pos = this.hashCode(key)
    let valuePair = this.table[pos]

    if (valuePair) {
      if (valuePair.key === key) return valuePair.value

      let index = pos + 1
      while (this.table[index] && this.table[index].key !== key) {
        index++
      }

      valuePair = this.table[index]
      if (valuePair && valuePair.key === key) {
        return valuePair.value
      }
    }

    return undefined
  }

  remove(key: K): boolean {
    const pos = this.hashCode(key)
    let valuePair = this.table[pos]
    if (valuePair) {
      if (valuePair.key === key) {
        delete this.table[pos]
        this.verifyRemoveSideEffect(key, pos)
        return true
      }

      let index = pos + 1
      while (this.table[index] && this.table[index].key !== key) {
        index++
      }

      valuePair = this.table[index]

      if (valuePair && valuePair.key) {
        delete this.table[index]
        this.verifyRemoveSideEffect(key, index)
        return true
      }
    }

    return false
  }

  private verifyRemoveSideEffect(key: K, removedPosition: number): void {
    const hash = this.hashCode(key)
    let index = removedPosition + 1

    while (this.table[index]) {
      const posHash = this.hashCode(this.table[index].key)

      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  size(): number {
    return Object.keys(this.table).length
  }

  clear(): void {
    this.table = {}
  }

  getTable(): { [key: string]: ValuePair<K, V> } {
    return this.table
  }

  toString(): string {
    if (this.isEmpty()) {
      return ''
    }

    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`

    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`
    }

    return objString
  }
}
