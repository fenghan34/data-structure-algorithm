/**
 * 队列
 * @constructor
 */
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  size() {
    return this.count - this.lowestCount;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    let str = this.items[this.lowestCount] + "";

    for (let i = this.lowestCount + 1; i < this.count; i++) {
      str += this.items[i];
    }

    return str;
  }

  peek() {
    return this.items[this.lowestCount];
  }

  /* 入队 */
  enQueue(element) {
    this.items[this.count++] = element;
  }

  /* 出队 */
  deQueue() {
    const item = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return item;
  }
}

/**
 * 模拟击鼓传花
 * @param {Array} list - 参与游戏人员列表
 * @param {number} num - 传递次数
 * @returns {object} 淘汰人员列表与胜出者
 */
function hotPotato(list, num) {
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

/**
 * 双端队列
 * @constructor
 */
class Deque extends Queue {
  // constructor() {
  //   this.items = {};
  //   this.count = 0; // 最后一个元素的索引值 - 1
  //   this.lowestCount = 0; // 第一个元素的索引值
  // }

  // size() {
  //   return this.count - this.lowestCount;
  // }

  // isEmpty() {
  //   return this.size() === 0;
  // }

  // clear() {
  //   this.items = {};
  //   this.count = 0;
  //   this.lowestCount = 0;
  // }

  // toString() {
  //   if (this.isEmpty()) return "";

  //   let str = this.items[this.lowestCount] + "";

  //   for (let i = this.lowestCount + 1; i < this.count; i++) {
  //     str += this.items[i];
  //   }

  //   return str;
  // }

  addFront(element) {
    if (this.isEmpty()) {
      // 空队列
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      // 第一个元素索引不为 0
      this.items[--this.lowestCount] = element;
    } else {
      // 第一个元素索引为 0
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }

      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  addBack(element) {
    // this.items[this.count++] = element;
    super.enQueue(element);
  }

  removeFront() {
    // if (this.isEmpty()) return undefined;

    // const item = this.items[this.lowestCount];
    // delete this.items[this.lowestCount];
    // this.lowestCount++;
    // return item;
    return super.deQueue();
  }

  removeBack() {
    if (this.isEmpty()) return undefined;

    const item = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return item;
  }

  peekFront() {
    // if (this.isEmpty()) return undefined;

    // return this.items[this.lowestCount];
    super.peek();
  }

  peekBack() {
    if (this.isEmpty()) return undefined;

    return this.items[this.count - 1];
  }
}

/**
 * 检查字符串是否是回文
 * @param {string} str 传入字符串
 * @example palindromeChecker('abcba')
 * @returns {boolean} 是否是回文
 */
function palindromeChecker(str) {
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
