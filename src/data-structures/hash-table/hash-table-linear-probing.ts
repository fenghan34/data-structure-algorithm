import { defaultToString } from '../../utils'
import { ValuePair } from '../dictionary/dictionary'
import { HashTable, Table, TableValue } from './hash-table'

/**
 * 线性探查法（非惰性）解决散列冲突
 */
export class HashMapLinearProbing<K, V> extends HashTable<K, V> {
  protected table: Table<K, V> = {}

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    super(toStrFn)
  }

  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key)

      if (!this.table[pos]) {
        this.table[pos] = new ValuePair(key, value) as TableValue<K, V>
      } else {
        let index = pos + 1

        while (this.table[index]) {
          index++
        }

        this.table[index] = new ValuePair(key, value) as TableValue<K, V>
      }

      this.count++

      return true
    }

    return false
  }

  get(key: K): V | undefined {
    const pos = this.hashCode(key)
    const valuePair = this.table[pos]

    if (valuePair) {
      if (valuePair.key === key) return valuePair.value

      let index = pos + 1

      while (this.table[index]) {
        if (this.table[index].key === key) {
          return this.table[index].value
        }

        index++
      }
    }

    return undefined
  }

  remove(key: K): boolean {
    const pos = this.hashCode(key)
    const valuePair = this.table[pos]

    if (valuePair) {
      if (valuePair.key === key) {
        delete this.table[pos]
        this.verifyRemoveSideEffect(key, pos)
        this.count--
        return true
      }

      let index = pos + 1

      while (this.table[index]) {
        if (this.table[index].key === key) {
          delete this.table[index]
          this.verifyRemoveSideEffect(key, index)
          this.count--
          return true
        }

        index++
      }
    }

    return false
  }

  protected verifyRemoveSideEffect(key: K, removedPosition: number): void {
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
}
