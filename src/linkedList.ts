interface LinkedListType {
  push: (element: any) => void;
  getElementAt: (index: number) => any;
  removeAt: (index: number) => any;
  insert: (element: any, index: number) => boolean;
  indexOf: (element: any) => number;
  remove: (element: any) => NodeType;
  isEmpty: () => boolean;
  size: () => number;
  getHead: () => NodeType;
  getTail?: () => NodeType;
  toString: () => string;
}

type NodeType = {
  element: any;
  prev?: NodeType | undefined | null;
  next: NodeType | undefined | null;
};

/**
 * 普通链表
 */
class LinkedList implements LinkedListType {
  #count: number = 0;
  #head: NodeType = null;

  /* 向尾部添加元素 */
  push(element: any) {
    const node = new LinkedListNode(element);

    if (!this.#head) {
      // 空链表
      this.#head = node;
    } else {
      // 非空链表

      let current = this.#head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.#count++;
  }

  /* 根据索引取出元素 */
  getElementAt(index: number) {
    if (index >= 0 && index <= this.#count) {
      let current = this.#head;
      while (index--) {
        current = current.next;
      }

      return current;
    }

    return undefined;
  }

  /* 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.#count) {
      let current = this.#head;

      if (index === 0) {
        // 移除第一项
        this.#head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this.#count--;
      return current.element;
    }

    return undefined;
  }

  /* 在任意位置插入元素 */
  insert(element: any, index: number) {
    if (index >= 0 && index <= this.#count) {
      const node = new LinkedListNode(element);

      if (index === 0) {
        const current = this.#head;
        node.next = current;
        this.#head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = this.getElementAt(index);

        previous.next = node;
        node.next = current;
      }

      this.#count++;
      return true;
    }

    return false;
  }

  /* 返回元素在链表中的索引 */
  indexOf(element: any) {
    let current = this.#head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /* 从链表中删除一个元素 */
  remove(element: any) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.#count === 0;
  }

  size() {
    return this.#count;
  }

  getHead() {
    return this.#head;
  }

  toString() {
    if (!this.#head) return "";

    let str = "";
    let current = this.#head;
    while (current) {
      str += current.element;
      current = current.next;
    }

    return str;
  }
}

/**
 * 链表节点类
 */
class LinkedListNode implements NodeType {
  element: any;
  next: NodeType;
  constructor(element: any) {
    this.element = element;
    this.next = null;
  }
}

/**
 * 双向链表节点类
 */
class DoublyLinkedListNode extends LinkedListNode {
  prev: NodeType;
  constructor(element: any) {
    super(element);
    this.prev = null;
  }
}

class DoublyLinkedList implements LinkedListType {
  #count: number = 0;
  #head: NodeType = null;
  #tail: NodeType = null;

  /* 向尾部添加元素 */
  push(element: any) {
    const node = new DoublyLinkedListNode(element);

    if (!this.#head) {
      // 空链表
      this.#head = node;
      this.#tail = node;
    } else {
      // 非空链表
      const current = this.#tail;
      current.next = node;
      node.prev = current;
      this.#tail = node;
    }

    this.#count++;
  }

  /* 根据索引取出元素 */
  getElementAt(index: number) {
    if (index >= 0 && index <= this.#count) {
      let current = this.#head;

      while (index--) {
        current = current.next;
      }

      return current;
    }

    return undefined;
  }

  /* 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.#count) {
      let current = this.#head;

      if (index === 0) {
        // 移除第一项
        this.#head = current.next;

        if (this.#count === 1) {
          // 如果只有一项
          this.#tail = null;
        } else {
          this.#head.prev = null;
        }
      } else if (index === this.#count - 1) {
        // 移除最后一项
        current = this.#tail;
        this.#tail = current.prev;
        this.#tail.next = null;
      } else {
        // 移除中间项
        current = this.getElementAt(index);
        const previous = current.prev;
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.#count--;
      return current.element;
    }

    return undefined;
  }

  /* 在任意位置插入元素 */
  insert(element: any, index: number) {
    if (index >= 0 && index <= this.#count) {
      const node = new DoublyLinkedListNode(element);
      let current = this.#head;

      if (index === 0) {
        // 开头插入
        if (!this.#head) {
          this.#head = node;
          this.#tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.#head = node;
        }
      } else if (index === this.#count) {
        // 尾部插入
        current = this.#tail;
        current.next = node;
        node.prev = current;
        this.#tail = node;
      } else {
        // 中间插入
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }

      this.#count++;
      return true;
    }

    return false;
  }

  /* 返回元素在链表中的索引 */
  indexOf(element: any) {
    let current = this.#head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  /* 从链表中删除一个元素 */
  remove(element: any) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.#count === 0;
  }

  size() {
    return this.#count;
  }

  getHead() {
    return this.#head;
  }

  getTail() {
    return this.#tail;
  }

  toString() {
    if (!this.#head) return "";

    let str = "";
    let current = this.#head;
    while (current) {
      str += current.element;
      current = current.next;
    }

    return str;
  }
}

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.push(1);
doublyLinkedList.push(2);
doublyLinkedList.push(3);
console.log(
  "🚀 ~ file: linkedList.ts ~ line 346 ~ doublyLinkedList",
  doublyLinkedList.getElementAt(1)
);
