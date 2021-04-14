/**
 * 集合类型
 */
class MySet {
  protected items: { [key: string]: unknown };

  constructor(iterable?: Iterable<unknown>) {
    this.items = {};

    if (iterable) {
      [...iterable].forEach((v: unknown) => this.add(v));
    }
  }

  add(element: any): boolean {
    if (!this.has(element)) {
      console.log(element);
      this.items[element] = element;
      return true;
    }

    return false;
  }

  has(element: any): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  delete(element: any): boolean {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }

    return false;
  }

  clear(): void {
    this.items = {};
  }

  get size(): number {
    return Object.keys(this.items).length;
  }

  values(): unknown[] {
    return Object.values(this.items);
  }

  keys(): unknown[] {
    return Object.keys(this.items);
  }

  entries(): Array<[unknown, unknown]> {
    return Object.entries(this.items);
  }

  forEach(
    callback: (value1: unknown, value2: unknown, values: MySet) => void,
    thisArg?: any
  ): void {
    for (const entry of this.entries()) {
      callback.apply(thisArg, [...entry, this]);
    }
  }

  /* 计算与另一个集合的并集 */
  union(otherSet: MySet): MySet {
    return new MySet([...this, ...otherSet]);
  }

  /* 计算与另一个集合的交集 */
  intersection(otherSet: MySet): MySet {
    let smallerSet = otherSet;
    let biggerSet: MySet = this;

    if (otherSet.size > this.size) {
      biggerSet = otherSet;
      smallerSet = this;
    }

    return new MySet([...smallerSet].filter((v) => biggerSet.has(v)));
  }

  /* 计算与另一个集合的差集 */
  difference(otherSet: MySet): MySet {
    return new MySet([...this].filter((v) => !otherSet.has(v)));
  }

  /* 判断是否是另一个集合的子集 */
  isSubSetOf(otherSet: MySet): boolean {
    if (this.size > otherSet.size) return false;

    return [...this].every((v) => otherSet.has(v));
  }

  /* 迭代协议 */
  *[Symbol.iterator](): Iterator<unknown> {
    return yield* this.values();
  }
}

Object.defineProperty(MySet.prototype, Symbol.toStringTag, { value: "MySet" });
