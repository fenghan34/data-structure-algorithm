import { Compare, CompareFn, defaultCompare } from '../../utils'
import { BinarySearchTree, TreeNode } from './binary-search-tree'

/**
 * 红黑树节点颜色
 */
export enum Colors {
  RED,
  BLACK,
}

/**
 * 红黑树节点
 */
export class RedBlackTreeNode<K> extends TreeNode<K> {
  declare left: RedBlackTreeNode<K>
  declare right: RedBlackTreeNode<K>
  parent: RedBlackTreeNode<K>
  color: Colors

  constructor(public key: K) {
    super(key)
    this.color = Colors.RED
  }

  isRed() {
    return this.color === Colors.RED
  }

  flipColor() {
    if (this.color === Colors.RED) {
      this.color = Colors.BLACK
    } else {
      this.color = Colors.RED
    }
  }
}

/**
 * 自平衡二叉搜索树-红黑树
 */
export class RedBlackTree<K> extends BinarySearchTree<K> {
  protected declare root: RedBlackTreeNode<K>

  constructor(protected compareFn: CompareFn<K> = defaultCompare) {
    super(compareFn)
  }

  /** 插入新节点 */
  insert(key: K) {
    if (!this.root) {
      this.root = new RedBlackTreeNode(key)
      this.root.color = Colors.BLACK
    } else {
      const node = this.insertNode(this.root, key)
      this.fixTreeProperties(node)
    }
  }

  protected insertNode(node: RedBlackTreeNode<K>, key: K): RedBlackTreeNode<K> {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackTreeNode(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    } else if (node.right == null) {
      node.right = new RedBlackTreeNode(key)
      node.right.parent = node
      return node.right
    } else {
      return this.insertNode(node.right, key)
    }
  }

  /** 插入节点后验证红黑树属性 */
  protected fixTreeProperties(node: RedBlackTreeNode<K>) {
    while (
      node &&
      node.parent &&
      node.parent.isRed() &&
      node.color !== Colors.BLACK
    ) {
      let parent = node.parent
      const grandParent = parent.parent

      if (grandParent) {
        if (grandParent.left === parent) {
          // 父节点是左侧子节点
          const uncle = grandParent.right

          // 叔节点也是红色——只需要重新填色
          if (uncle && uncle.color === Colors.RED) {
            grandParent.color = Colors.RED
            parent.color = Colors.BLACK
            uncle.color = Colors.BLACK
            node = grandParent
          } else {
            // 节点是右侧子节点-左旋转
            if (node === parent.right) {
              this.rotationRR(parent)
              node = parent
              parent = node.parent as RedBlackTreeNode<K>
            }

            // 节点是左侧子节点-右旋转
            this.rotationLL(grandParent)
            parent.color = Colors.BLACK
            grandParent.color = Colors.RED
            node = parent
          }
        } else {
          // 父节点是右侧子节点
          const uncle = grandParent.left

          // 叔节点是右侧子节点
          if (uncle && uncle.color === Colors.RED) {
            grandParent.color = Colors.RED
            parent.color = Colors.BLACK
            uncle.color = Colors.BLACK
            node = grandParent
          } else {
            // 节点是左侧子节点-右旋转
            if (node === parent.left) {
              this.rotationLL(parent)
              node = parent
              parent = node.parent as RedBlackTreeNode<K>
            }

            // 节点是右侧子节点-左旋转
            this.rotationRR(grandParent)
            parent.color = Colors.BLACK
            grandParent.color = Colors.RED
            node = parent
          }
        }
      }
    }

    this.root.color = Colors.BLACK
  }

  /**
   * 左-左旋转（右旋转）
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   */
  rotationLL(node: RedBlackTreeNode<K>): any {
    const temp = node.left

    if (temp) {
      node.left = temp.right

      if (temp.right && temp.right.key) {
        temp.right.parent = node
      }

      temp.parent = node.parent

      if (!node.parent) {
        this.root = temp
      } else {
        if (node === node.parent.left) {
          node.parent.left = temp
        } else {
          node.parent.right = temp
        }
      }

      temp.right = node
      node.parent = temp
    }
  }

  /**
   * 右-右旋转（左旋转）
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   */
  rotationRR(node: RedBlackTreeNode<K>): any {
    const temp = node.right

    if (temp) {
      node.right = temp.left

      if (temp.left && temp.left.key) {
        temp.left.parent = node
      }

      temp.parent = node.parent

      if (!node.parent) {
        this.root = temp
      } else {
        if (node === node.parent.left) {
          node.parent.left = temp
        } else {
          node.parent.right = temp
        }
      }

      temp.left = node
      node.parent = temp
    }
  }
}
