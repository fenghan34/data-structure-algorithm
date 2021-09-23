import { defaultToString } from '../../utils'
import { ValuePair } from '../dictionary/dictionary'
import { LinkedList } from '../linked-list/linked-list'
import { HashTable, Table, TableValue } from './hash-table'

/**
 * 分离链接法解决散列冲突
 */
export class HashMapSeparateChaining<K, V> extends HashTable<K, V> {
  protected table: Table<K, V> = {}

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    super(toStrFn)
  }

  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key)

      if (!this.table[pos]) {
        // 散列表的每一个位置都是一个链表
        this.table[pos] = new LinkedList() as unknown as TableValue<K, V>
      }

      this.table[pos].push(new ValuePair(key, value))

      this.count++

      return true
    }

    return false
  }

  get(key: K): V | undefined {
    const pos = this.hashCode(key)
    const linkedList = this.table[pos]

    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead()

      while (current) {
        if (current.element.key === key) {
          return current.element.value
        }

        current = current.next
      }
    }
    return undefined
  }

  remove(key: K): boolean {
    const pos = this.hashCode(key)
    const linkedList = this.table[pos]

    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead()

      while (current) {
        if (current.element.key === key) {
          linkedList.remove(current.element)

          if (linkedList.isEmpty()) {
            delete this.table[pos]
          }

          this.count--

          return true
        }

        current = current.next
      }
    }

    return false
  }
}
