import { Compare, CompareFn, defaultCompare } from '../../utils'
import { BinarySearchTree, TreeNode } from './binary-search-tree'

/**
 * 平衡因子
 */
enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5,
}

/**
 * 自平衡二叉搜索树
 */
export class AVLTree<K> extends BinarySearchTree<K> {
  constructor(protected compareFn: CompareFn<K> = defaultCompare) {
    super(compareFn)
  }

  /** 计算一个节点高度 */
  private getNodeHeight(node: TreeNode<K>): number {
    return node
      ? Math.max(
          this.getNodeHeight(node.left),
          this.getNodeHeight(node.right)
        ) + 1
      : -1
  }

  /** 计算一个节点的平衡因子 */
  private getBalanceFactor(node: TreeNode<K>): BalanceFactor {
    const heightDiff =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right)

    switch (heightDiff) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  /** 向 AVL 树插入节点 */
  insert(key: K) {
    this.root = this.insertNode(this.root, key)
  }

  protected insertNode(node: TreeNode<K>, key: K): TreeNode<K> {
    if (!node) {
      return new TreeNode(key)
    }

    const compareRes = this.compareFn(key, node.key)

    if (compareRes === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key)
    } else if (compareRes === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key)
    } else return node

    // 插入后检查树是否平衡
    const balanceFactor = this.getBalanceFactor(node)

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }

    return node
  }

  /**
   * LL 向右的单旋转
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   */
  rotationLL(node: TreeNode<K>) {
    const temp = node.left
    node.left = temp.right
    temp.right = node
    return temp
  }

  /**
   * RR 向左的单旋转
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   *  */
  rotationRR(node: TreeNode<K>) {
    const temp = node.right
    node.right = temp.left
    temp.left = node
    return temp
  }

  /** LR 向右的双旋转 */
  rotationLR(node: TreeNode<K>) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  /** RL 向左的双旋转 */
  rotationRL(node: TreeNode<K>) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  /** 从 AVL 树中移除节点 */
  protected removeNode(node: TreeNode<K>, key: K) {
    node = super.removeNode(node, key)
    if (!node) return node // null，不需要平衡

    // 检测树是否平衡
    const balanceFactor = this.getBalanceFactor(node)

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left)
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node)
      }

      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left as TreeNode<K>)
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right)
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node)
      }

      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.left as TreeNode<K>)
      }
    }

    return node
  }
}
