interface LinkedListType {
  equalsFn: (a: NodeType, b: NodeType) => boolean;
  push: (element: any) => void;
  getElementAt: (index: number) => any;
  removeAt: (index: number) => any;
}

type NodeType = {
  element: any;
  next: NodeType | undefined | null;
};

class LinkedList implements LinkedListType {
  count: number;
  head: NodeType;

  constructor() {
    this.count = 0;
    this.head = null;
  }

  equalsFn(a: NodeType, b: NodeType) {
    return a === b;
  }

  /* 向尾部添加元素 */
  push(element: any) {
    const node = new LinkedListNode(element);

    if (!this.head) {
      // 空链表
      this.head = node;
    } else {
      // 非空链表

      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.count++;
  }

  /* 根据索引取出元素 */
  getElementAt(index: number) {
    if (index >= 0 && index <= this.count) {
      let current = this.head;
      while (index--) {
        current = current.next;
      }

      return current;
    }

    return undefined;
  }

  /* 根据索引移除元素 */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        // 移除第一项
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }

    return undefined;
  }

  /* 在任意位置插入元素 */
  insert(element: any, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new LinkedListNode(element);

      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = this.getElementAt(index);

        previous.next = node;
        node.next = current;
      }

      this.count++;
      return true;
    }

    return false;
  }
}

class LinkedListNode implements NodeType {
  element: any;
  next: NodeType;
  constructor(element: any) {
    this.element = element;
    this.next = null;
  }
}

const linkList = new LinkedList();

linkList.push(1);
linkList.push(2);
linkList.push(3);
linkList.removeAt(3);
console.log("🚀 ~ file: linkedList.ts ~ line 97 ~ linkList", linkList);
