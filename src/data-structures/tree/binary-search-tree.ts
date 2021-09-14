import { Compare, CompareFn, defaultCompare } from '../../utils'

/**
 * 树节点
 */
export class TreeNode<K> {
  left: TreeNode<K>

  right: TreeNode<K>

  constructor(public key: K) {}

  toString(): string {
    return `${this.key}`
  }
}

/**
 * 二叉搜索树
 */
export class BinarySearchTree<K> {
  protected root: TreeNode<K> // 根节点引用

  constructor(protected compareFn: CompareFn<K> = defaultCompare) {}

  /** 向二叉搜索树插入一个键 */
  insert(key: K): void {
    if (!this.root) {
      this.root = new TreeNode(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  protected insertNode(node: TreeNode<K>, key: K): void {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 新节点键小于当前节点键
      if (!node.left) {
        node.left = new TreeNode(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      // 新节点键大于当前节点键
      if (!node.right) {
        node.right = new TreeNode(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  /** 中序遍历，按从小到大顺序遍历 */
  inOrderTraverse(callback: (key: K) => void): void {
    this.inOrderTraverseNode(this.root, callback)
  }

  protected inOrderTraverseNode(
    node: TreeNode<K>,
    callback: (key: K) => void
  ): void {
    if (node) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  /** 先序遍历，按优先后代节点顺序遍历 */
  preOrderTraverse(callback: (key: K) => void): void {
    this.preOrderTraverseNode(this.root, callback)
  }

  protected preOrderTraverseNode(
    node: TreeNode<K>,
    callback: (key: K) => void
  ): void {
    if (node) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  /** 后序遍历，先访问节点的后代节点，再访问节点本身 */
  postOrderTraverse(callback: (key: K) => void): void {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node: TreeNode<K>, callback: (key: K) => void): void {
    if (node) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  /** 最小键，沿着树左边寻找 */
  min(): K {
    return this.minNode(this.root)?.key
  }

  protected minNode(node: TreeNode<K>): TreeNode<K> {
    let current = node

    while (current && current.left) {
      current = current.left
    }

    return current
  }

  /** 最大键，沿着树右边寻找 */
  max(): K {
    return this.maxNode(this.root)?.key
  }

  protected maxNode(node: TreeNode<K>): TreeNode<K> {
    let current = node

    while (current && current.right) {
      current = current.right
    }

    return current
  }

  /** 搜索一个特定的值 */
  search(key: K): boolean {
    return this.searchNode(this.root, key)
  }

  protected searchNode(node: TreeNode<K> | null, key: K): boolean {
    if (!node) return false

    const compareRes = this.compareFn(key, node.key)

    if (compareRes === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    }

    if (compareRes === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    }

    return false
  }

  /** 移除一个节点 */
  remove(key: K): void {
    this.root = this.removeNode(this.root, key)
  }

  protected removeNode(node: TreeNode<K>, key: K): TreeNode<K> {
    if (!node) return null

    const compareRes = this.compareFn(key, node.key)

    if (compareRes === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    }
    if (compareRes === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    }
    // 找到需要移除的键

    if (!node.left && !node.right) {
      // 不存在左右侧子节点
      node = null
      return node
    }

    if (!node.left) {
      // 只有右侧子节点
      node = node.right
      return node
    }

    if (!node.right) {
      // 只有左侧子节点
      node = node.left
      return node
    }

    // 左右侧子节点都有
    const aux = this.minNode(node.right) as TreeNode<K> // 找到右侧子树最小的节点
    node.key = aux.key // 用右侧子树中最小节点的键去更新这个节点的值
    node.right = this.removeNode(node.right, aux.key) // 移除右侧子树中的最小节点
    return node
  }
}
