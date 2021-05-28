import { Compare, CompareFn, defaultCompare } from "./utils/index"

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

type TraverseCallback = (param: unknown) => void

/**
 * 二叉搜索树类型
 */
class BinarySearchTree {
  root: TreeNode = null // 根节点引用
  compareFn: CompareFn // 用于比较节点键值
  constructor(compareFn = defaultCompare) {
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

  protected insertNode(node: TreeNode, key: unknown): void {
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

  /* 中序遍历，按从小到大顺序遍历 */
  inOrderTraverse(callback: TraverseCallback): void {
    this.inOrderTraverseNode(this.root, callback)
  }

  protected inOrderTraverseNode(
    node: TreeNode,
    callback: TraverseCallback
  ): void {
    if (node) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  /* 先序遍历，按优先后代节点顺序遍历 */
  preOrderTraverse(callback: TraverseCallback): void {
    this.preOrderTraverseNode(this.root, callback)
  }

  protected preOrderTraverseNode(
    node: TreeNode,
    callback: TraverseCallback
  ): void {
    if (node) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  /* 后序遍历，先访问节点的后代节点，再访问节点本身 */
  postOrderTraverse(callback: TraverseCallback): void {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node: TreeNode, callback: TraverseCallback): void {
    if (node) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  /* 最小键，沿着树左边寻找 */
  min(): unknown {
    return this.minNode(this.root)?.key
  }

  protected minNode(node: TreeNode): TreeNode {
    let current = node

    while (current && current.left) {
      current = current.left
    }

    return current
  }

  /* 最大键，沿着树右边寻找 */
  max(): unknown {
    return this.maxNode(this.root)?.key
  }

  protected maxNode(node: TreeNode): TreeNode {
    let current = node

    while (current && current.right) {
      current = current.right
    }

    return current
  }

  /* 搜索一个特定的值 */
  search(key: unknown): boolean {
    return this.searchNode(this.root, key)
  }

  protected searchNode(node: TreeNode, key: unknown): boolean {
    if (!node) return false

    const compareRes = this.compareFn(key, node.key)

    if (compareRes === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (compareRes === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else return false
  }

  /* 移除一个节点 */
  remove(key: unknown): void {
    this.root = this.removeNode(this.root, key)
  }

  protected removeNode(node: TreeNode, key: unknown): TreeNode {
    if (!node) return null

    const compareRes = this.compareFn(key, node.key)

    if (compareRes === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (compareRes === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
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
      const aux = this.minNode(node.right) // 找到右侧子树最小的节点
      node.key = aux.key // 用右侧子树中最小节点的键去更新这个节点的值
      node.right = this.removeNode(node.right, aux.key) // 移除右侧子树中的最小节点
      return node
    }
  }
}

enum BalanceFactor {
  UNBALANCED_RIGHT = -2,
  SLIGHTLY_UNBALANCED_RIGHT,
  SLIGHTLY_UNBALANCED_LEFT = 1,
  UNBALANCED_LEFT,
  BALANCED,
}

/**
 * 自平衡二叉搜索树-AVL类型
 */
class AVLTree extends BinarySearchTree {
  /* 计算一个节点高度 */
  getNodeHeight(node: TreeNode): number {
    return node
      ? Math.max(
          this.getNodeHeight(node.left),
          this.getNodeHeight(node.right)
        ) + 1
      : -1
  }

  /* 计算一个节点的平衡因子 */
  getBalanceFactor(node: TreeNode): BalanceFactor {
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

  /* 向 AVL 树插入节点 */
  insert(key: unknown): void {
    this.root = this.insertNode(this.root, key)
  }

  protected insertNode(node: TreeNode, key: unknown): TreeNode {
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

  /* LL 向右的单旋转 */
  rotationLL(node: TreeNode): TreeNode {
    const temp = node.left
    node.left = temp.right
    temp.right = node
    return temp
  }

  /* RR 向左的单旋转 */
  rotationRR(node: TreeNode): TreeNode {
    const temp = node.right
    node.right = temp.left
    temp.left = node
    return temp
  }

  /* LR 向右的双旋转 */
  rotationLR(node: TreeNode): TreeNode {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  /* RL 向左的双旋转 */
  rotationRL(node: TreeNode): TreeNode {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  /* 从 AVL 树中移除节点 */
  removeNode(node: TreeNode, key: unknown): TreeNode {
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
        return this.rotationLR(node.left)
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
        return this.rotationRL(node.left)
      }
    }

    return node
  }
}

/**
 * 自平衡二叉搜索树-红黑树
 */
class RedBlackTree extends AVLTree {
  root: RedBlackTreeNode

  /* 插入新节点 */
  insert(key: unknown): void {
    if (!this.root) {
      this.root = new RedBlackTreeNode(key)
      this.root.color = Color.BLACK
    } else {
      const node = this.insertNode(this.root, key)
      this.fixTreeProperties(node)
    }
  }

  protected insertNode<T>(node: RedBlackTreeNode, key: T): RedBlackTreeNode {
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

  /* 插入节点后验证红黑树属性 */
  protected fixTreeProperties(node: RedBlackTreeNode) {
    while (
      node &&
      node.parent &&
      node.parent.isRed() &&
      node.color !== Color.BLACK
    ) {
      let parent = node.parent
      const grandParent = parent.parent

      // 父节点是左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right

        // 叔节点也是红色——只需要重新填色
        if (uncle && uncle.color === Color.RED) {
          grandParent.color = Color.RED
          parent.color = Color.BLACK
          uncle.color = Color.BLACK
          node = grandParent
        } else {
          // 节点是右侧子节点-左旋转
          if (node === parent.right) {
            this.rotationRR(parent)
            node = parent
            parent = node.parent
          }

          // 节点是左侧子节点-右旋转
          this.rotationLL(grandParent)
          parent.color = Color.BLACK
          grandParent.color = Color.RED
          node = parent
        }
      } else {
        // 父节点是右侧子节点
        const uncle = grandParent.left

        // 叔节点是右侧子节点
        if (uncle && uncle.color === Color.RED) {
          grandParent.color = Color.RED
          parent.color = Color.BLACK
          uncle.color = Color.BLACK
          node = grandParent
        } else {
          // 节点是左侧子节点-右旋转
          if (node === parent.left) {
            this.rotationLL(parent)
            node = parent
            parent = node.parent
          }

          // 节点是右侧子节点-左旋转
          this.rotationRR(grandParent)
          parent.color = Color.BLACK
          grandParent.color = Color.RED
          node = parent
        }
      }
    }

    this.root.color = Color.BLACK
  }

  /* 左-左旋转（右旋转） */
  rotationLL(node: RedBlackTreeNode): any {
    const temp = node.left
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

  /* 右-右旋转（左旋转） */
  rotationRR(node: RedBlackTreeNode): any {
    const tmp = node.right
    node.right = tmp.left

    if (tmp.left && tmp.left.key) {
      tmp.left.parent = node
    }

    tmp.parent = node.parent

    if (!node.parent) {
      this.root = tmp
    } else {
      if (node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }

    tmp.left = node
    node.parent = tmp
  }
}

enum Color {
  RED,
  BLACK,
}

/**
 * 红黑树节点类型
 */
class RedBlackTreeNode extends TreeNode {
  color: Color = Color.RED
  parent: RedBlackTreeNode = null
  left: RedBlackTreeNode
  right: RedBlackTreeNode

  isRed() {
    return this.color === Color.RED
  }
}

export { BinarySearchTree, AVLTree, RedBlackTree }
