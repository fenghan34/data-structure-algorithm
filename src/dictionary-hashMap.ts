import { LinkedList } from './linkedList'

type ToString = (param: unknown) => string
const defaultToString: ToString = (param: unknown) => '' + param

/**
 * 字典值类型
 */
class ValuePair<K = any, V = any> {
  key: K
  value: V
  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }

  toString(): string {
    return `${this.key}:${this.value}`
  }
}

/**
 * 字典类型
 */
class Dictionary<K = any, V = any> {
  toStrFn: ToString
  table: { [key: string]: ValuePair<K, V> } = {}

  constructor(toStrFn: ToString = defaultToString) {
    this.toStrFn = toStrFn
  }

  /* 检测一个键是否存在于字典中 */
  hasKey(key: K) {
    return this.table[this.toStrFn(key)] != null
  }

  /* 向字典中添加元素 */
  set(key: K, value: V): boolean {
    if (key != null && value != null) {
      const tableKey: string = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }

    return false
  }

  /* 从字典中移除一个值 */
  remove(key: K): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  /* 从字典中检索一个值 */
  get(key: K): V | undefined {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair?.value || undefined
  }

  /* 获取字典中所有的 valuePair 对象 */
  keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table)
  }

  /* 获取字典中所有原始键名，也就是 valuePair 对象的 key 属性 */
  keys(): Array<K> {
    return this.keyValues().map((v) => v.key)
  }

  /* 获取字典中所有值，也就是 valuePair 对象的 value 属性 */
  values(): Array<V> {
    return this.keyValues().map((v) => v.value)
  }

  /* 迭代方法 */
  forEach(callback: (key: K, value: V) => void, thisArg?: any): void {
    const valuePairs = this.keyValues()

    for (let { key, value } of valuePairs) {
      callback.apply(thisArg || null, [key, value])
    }
  }

  /* 获取字典大小 */
  size(): number {
    return Object.keys(this.table).length
  }

  /* 检测字典是否为空字典 */
  isEmpty(): boolean {
    return this.size() === 0
  }

  /* 清空字典 */
  clear(): void {
    this.table = {}
  }

  /* 字符串序列化 */
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

type ToHashCode = (param: unknown) => number

function loseloseHashCode(key: unknown): number {
  if (typeof key === 'number') return key

  const tableKey = this.toStrFn(key)
  let hash = 0

  for (let i = 0; i < tableKey.length; i++) {
    hash += tableKey.charCodeAt(i)
  }

  return hash % 37
}

function djb2HashCode(key: unknown): number {
  const tableKey: string = this.toStrFn(key)
  let hash = 5381
  for (let i = 0; i < tableKey.length; i++) {
    hash = hash * 33 + tableKey.charCodeAt(i)
  }
  return hash % 1013
}

/**
 * 散列表类型
 */
class HashMap<K = any, V = any> {
  toStrFn: ToString
  hashCode: ToHashCode // 散列函数
  table: { [key: string]: ValuePair<K, V> | LinkedList } = {}
  constructor(
    toStrFn: ToString = defaultToString,
    hashCode: ToHashCode = loseloseHashCode
  ) {
    this.toStrFn = toStrFn
    this.hashCode = hashCode
  }

  /* 将键和值加入散列表 */
  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key)
      this.table[pos] = new ValuePair(key, value)

      return true
    }

    return false
  }

  /* 从散列表中获取一个值 */
  get(key: K): V {
    const valuePair = this.table[this.hashCode(key)]
    return (valuePair as ValuePair<K, V>)?.value
  }

  /* 从散列表中移除一个值 */
  remove(key: K): boolean {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]

    if (valuePair) {
      delete this.table[hash]
      return true
    }

    return false
  }

  /* 字符串序列化 */
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

/**
 * 分离链接法解决散列冲突
 */
class HashMapSeparateChaining<K = any, V = any> extends HashMap {
  table: { [key: string]: LinkedList } = {}

  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key)

      if (!this.table[pos]) {
        /* 散列表的每一个位置都是一个链表 */
        this.table[pos] = new LinkedList()
      }

      this.table[pos].push(new ValuePair(key, value))
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
        if ((current.element as ValuePair).key === key) {
          return (current.element as ValuePair).value
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
        if ((current.element as ValuePair).key === key) {
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
}

/**
 * 线性探查法（非惰性）解决散列冲突
 */
class HashMapLinearProbing<K = any, V = any> extends HashMap {
  declare table: { [key: string]: ValuePair<K, V> }
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

  get(key: K): V | undefined {
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

  verifyRemoveSideEffect(key: K, removedPosition: number) {
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

export { Dictionary, HashMap, HashMapSeparateChaining, HashMapLinearProbing }
