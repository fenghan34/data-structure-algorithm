/**
 * 树节点类型
 */
class TreeNode {
  key: unknown
  left: TreeNode = null
  right: TreeNode = null
  constructor(key: unknown) {
    this.key = key
  }
}

function defaultCompare() {}

/**
 * 二叉搜索树类型
 */
class BinarySearchTree {
  root: TreeNode = null // 根节点引用
  compareFn: () => void // 用于比较节点值
  constructor(compareFn: () => void = defaultCompare) {
    this.compareFn = compareFn
  }

  /* 向二叉搜索树插入一个键 */
  insert(key: unknown): void {
    if (!this.root) {
      this.root = new TreeNode(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node: TreeNode, key: unknown): void {}
}
