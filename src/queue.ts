interface QueueType {
  size: () => number;
  isEmpty: () => boolean;
  clear: () => void;
  toString: () => string;
  enQueue?: <E>(element: E) => void;
  deQueue?: () => any;
  peek?: () => any;
}

interface Items {
  [key: string]: any;
}

/**
 * 队列
 * @constructor
 */
class Queue implements QueueType {
  #count: number = 0;
  #lowestCount: number = 0;
  #items: Items = {};

  size() {
    return this.#count - this.#lowestCount;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#count = 0;
    this.#lowestCount = 0;
    this.#items = {};
  }

  toString() {
    let str = this.#items[this.#lowestCount] + "";

    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      str += this.#items[i];
    }

    return str;
  }

  peek() {
    return this.#items[this.#lowestCount];
  }

  /* 入队 */
  enQueue<T>(element: T) {
    this.#items[this.#count++] = element;
  }

  /* 出队 */
  deQueue() {
    const item = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount++;
    return item;
  }
}

/**
 * 模拟击鼓传花
 * @param {Array} list - 参与游戏人员列表
 * @param {number} num - 传递次数
 * @returns {object} 淘汰人员列表与胜出者
 */
function hotPotato(
  list: Array<string>,
  num: number
): { outList: Array<string>; winner: string } {
  const queue = new Queue();
  const outList = [];

  for (let i = 0; i < list.length; i++) {
    queue.enQueue(list[i]);
  }

  while (queue.size() > 1) {
    for (let j = 0; j < num; j++) {
      queue.enQueue(queue.deQueue());
    }

    outList.push(queue.deQueue());
  }

  return {
    outList,
    winner: queue.deQueue(),
  };
}

interface DequeType extends QueueType {
  addFront: <E>(element: E) => void;
  addBack: <E>(element: E) => void;
  removeFront: () => any;
  removeBack: () => any;
  peekFront: () => any;
  peekBack: () => any;
}

/**
 * 双端队列
 * @constructor
 */
class Deque implements DequeType {
  #count: number = 0;
  #lowestCount: number = 0;
  #items: Items = {};

  size() {
    return this.#count - this.#lowestCount;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.#items = {};
    this.#count = 0;
    this.#lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) return "";

    let str = this.#items[this.#lowestCount] + "";

    for (let i = this.#lowestCount + 1; i < this.#count; i++) {
      str += this.#items[i];
    }

    return str;
  }

  addFront<T>(element: T) {
    if (this.isEmpty()) {
      // 空队列
      this.addBack(element);
    } else if (this.#lowestCount > 0) {
      // 第一个元素索引不为 0
      this.#items[--this.#lowestCount] = element;
    } else {
      // 第一个元素索引为 0
      for (let i = this.#count; i > 0; i--) {
        this.#items[i] = this.#items[i - 1];
      }

      this.#count++;
      this.#lowestCount = 0;
      this.#items[0] = element;
    }
  }

  addBack<T>(element: T) {
    this.#items[this.#count++] = element;
  }

  removeFront() {
    if (this.isEmpty()) return undefined;

    const item = this.#items[this.#lowestCount];
    delete this.#items[this.#lowestCount];
    this.#lowestCount++;
    return item;
  }

  removeBack() {
    if (this.isEmpty()) return undefined;

    const item = this.#items[this.#count - 1];
    delete this.#items[this.#count - 1];
    this.#count--;
    return item;
  }

  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.#items[this.#count - 1];
  }
}

/**
 * 检查字符串是否是回文
 * @param {string} str 传入字符串
 * @example palindromeChecker('abcba')
 * @returns {boolean} 是否是回文
 */
function palindromeChecker(str: string): boolean {
  if (!str || str.length === 0) return false;

  const deque = new Deque();
  for (let i = 0; i < str.length; i++) {
    deque.addBack(str[i]);
  }

  while (deque.size() > 1) {
    if (deque.removeFront() !== deque.removeBack()) {
      return false;
    }
  }

  return true;
}

console.log("🚀 palindromeChecker()", palindromeChecker("abcba"));
