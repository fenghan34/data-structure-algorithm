import { defaultToString } from '../../utils'
import { ValuePair } from '../dictionary/dictionary'
import { LinkedList } from '../linked-list/linked-list'

/**
 * 分离链接法解决散列冲突
 */
export class HashMapSeparateChaining<K, V> {
  protected table: { [key: string]: LinkedList<ValuePair<K, V>> } = {}

  constructor(protected toStrFn: (key: K) => string = defaultToString) {}

  private loseloseHashCode(key: K) {
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

  hashCode(key: K) {
    return this.loseloseHashCode(key)
  }

  put(key: K, value: V) {
    if (key != null && value != null) {
      const pos = this.hashCode(key)

      if (!this.table[pos]) {
        // 散列表的每一个位置都是一个链表
        this.table[pos] = new LinkedList()
      }

      this.table[pos].push(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key: K): V {
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

  remove(key: K) {
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
          return true
        }
        current = current.next
      }
    }

    return false
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    let count = 0
    Object.values(this.table).forEach(
      (linkedList) => (count += linkedList.size())
    )
    return count
  }

  clear() {
    this.table = {}
  }

  getTable() {
    return this.table
  }

  toString() {
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
