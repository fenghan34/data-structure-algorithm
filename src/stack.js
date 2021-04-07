/**
 * 栈
 * @constructor
 */
class Stack {
  constructor() {
    this.items = {};
    this.count = 0;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) return "";

    let str = "";
    for (let i = 0; i < this.count; i++) {
      str += this.items[i];
    }

    return str;
  }

  push(element) {
    this.items[this.count++] = element;
  }

  pop() {
    if (this.isEmpty()) return undefined;

    this.count--;
    const item = this.items[this.count];
    delete this.items[this.count];
    return item;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }
}

/**
 * 进制转换算法
 * @param {number} decNumber 传入的数字
 * @param {number} base 进制基数
 * @example baseConverter(100345, 2)
 * @returns {string} 转换结果
 */
function baseConverter(decNumber, base) {
  const stack = new Stack();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (!(base >= 2 && base <= 36)) return "";

  let rem;
  let result = "";
  while (decNumber > 0) {
    rem = ~~(decNumber % base);
    stack.push(rem);
    decNumber = ~~(decNumber / base);
  }

  while (!stack.isEmpty()) {
    result += digits[stack.pop()];
  }

  return result;
}
