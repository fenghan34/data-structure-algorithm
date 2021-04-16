type ToString = (param: unknown) => string;
const defaultToString: ToString = (param: unknown) => "" + param;

/**
 * 字典值类型
 */
class ValuePair {
  key: unknown;
  value: unknown;
  constructor(key: unknown, value: unknown) {
    this.key = key;
    this.value = value;
  }

  toString(): string {
    return `${this.key}:${this.value}`;
  }
}

/**
 * 字典类型
 */
class Dictionary {
  toStrFn: ToString;
  table: { [key: string]: ValuePair } = {};

  constructor(toStrFn: ToString = defaultToString) {
    this.toStrFn = toStrFn;
  }

  /* 检测一个键是否存在于字典中 */
  hasKey(key: unknown) {
    return this.table[this.toStrFn(key)] != null;
  }

  /* 向字典中添加元素 */
  set(key: unknown, value: unknown): boolean {
    if (key != null && value != null) {
      const tableKey: string = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }

    return false;
  }

  /* 从字典中移除一个值 */
  remove(key: unknown): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  /* 从字典中检索一个值 */
  get(key: unknown): unknown {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair?.value || undefined;
  }

  /* 获取字典中所有的 valuePair 对象 */
  keyValues(): ValuePair[] {
    return Object.values(this.table);
  }

  /* 获取字典中所有原始键名，也就是 valuePair 对象的 key 属性 */
  keys(): Array<unknown> {
    return this.keyValues().map((v) => v.key);
  }

  /* 获取字典中所有值，也就是 valuePair 对象的 value 属性 */
  values(): Array<unknown> {
    return this.keyValues().map((v) => v.value);
  }

  /* 迭代方法 */
  forEach(
    callback: (key: unknown, value: unknown) => void,
    thisArg?: any
  ): void {
    const valuePairs = this.keyValues();

    for (let { key, value } of valuePairs) {
      callback.apply(thisArg || null, [key, value]);
    }
  }

  /* 获取字典大小 */
  size(): number {
    return Object.keys(this.table).length;
  }

  /* 检测字典是否为空字典 */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /* 清空字典 */
  clear(): void {
    this.table = {};
  }

  /* 字符串序列化 */
  toString(): string {
    if (this.isEmpty()) return "";

    const valuePairs = this.keyValues();
    let str = `${valuePairs[0].toString()}`;

    for (let i = 1; i < valuePairs.length; i++) {
      str += `${valuePairs[i].toString()}`;
    }

    return str;
  }
}

type ToHashCode = (param: unknown) => number;

function loseloseHashCode(key: unknown): number {
  if (typeof key === "number") return key;

  const tableKey = this.toStrFn(key);
  let hash = 0;

  for (let i = 0; i < tableKey.length; i++) {
    hash += tableKey.charCodeAt(i);
  }

  return hash % 37;
}

/**
 * 散列表类型
 */
class HashMap {
  toStrFn: ToString;
  hashCode: ToHashCode; // 散列函数
  table: { [key: string]: ValuePair } = {};
  constructor(
    toStrFn: ToString = defaultToString,
    hashCode: ToHashCode = loseloseHashCode
  ) {
    this.toStrFn = toStrFn;
    this.hashCode = hashCode;
  }

  /* 将键和值加入散列表 */
  put(key: unknown, value: unknown): boolean {
    if (key != null && value != null) {
      const pos = this.hashCode(key);
      this.table[pos] = new ValuePair(key, value);

      return true;
    }

    return false;
  }

  /* 从散列表中移除一个值 */
  remove(key: unknown): boolean {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];

    if (valuePair) {
      delete this.table[hash];
      return true;
    }

    return false;
  }
}
