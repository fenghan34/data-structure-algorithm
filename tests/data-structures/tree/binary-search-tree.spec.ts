import { BinarySearchTree } from '@/data-structures/tree/binary-search-tree'

describe('BinarySearchTree', () => {
  let tree: BinarySearchTree<number>

  beforeEach(() => {
    tree = new BinarySearchTree()
  })

  function insertNodes(): void {
    const nodes = [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6]
    nodes.forEach((n) => tree.insert(n))
  }

  test('insert key', () => {
    tree.insert(1)
    expect(tree.search(1)).toBeTruthy()
    expect(tree.min()).toBe(1)
    expect(tree.max()).toBe(1)

    tree.insert(2)
    expect(tree.search(2)).toBeTruthy()
    expect(tree.max()).toBe(2)

    tree.insert(3)
    expect(tree.search(3)).toBeTruthy()
    expect(tree.max()).toBe(3)
  })

  test('return if the tree has specific key', () => {
    insertNodes()

    expect(tree.search(4)).toBeFalsy()
    expect(tree.search(5)).toBeTruthy()
    expect(tree.search(18)).toBeTruthy()
    expect(tree.search(0)).toBeFalsy()
  })

  test('remove key', () => {
    expect(tree.getRoot()).toBeUndefined()
    tree.remove(2)
    expect(tree.getRoot()).toBeUndefined()

    insertNodes()
    const root = tree.getRoot()

    expect(root.left.left.key).toBe(5)
    tree.remove(6)
    expect(tree.search(6)).toBeFalsy()
    tree.remove(5)
    expect(tree.search(5)).toBeFalsy()
    expect(root.left.left.key).toBe(3)

    expect(root.left.right.key).toBe(9)
    tree.remove(8)
    expect(tree.search(8)).toBeFalsy()
    tree.remove(9)
    expect(tree.search(9)).toBeFalsy()
    expect(root.left.right.key).toBe(10)

    tree.remove(15)
    expect(root.right.key).toBe(18)
  })

  test('inOrderTraverse', () => {
    insertNodes()

    let i = 0
    const arr = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]
    tree.inOrderTraverse((key) => {
      expect(key).toBe(arr[i++])
    })
  })

  test('preOrderTraverse', () => {
    insertNodes()

    let i = 0
    const arr = [11, 7, 5, 3, 6, 9, 8, 10, 15, 13, 12, 14, 20, 18, 25]
    tree.preOrderTraverse((key) => {
      expect(key).toBe(arr[i++])
    })
  })

  test('postOrderTraverse', () => {
    insertNodes()

    let i = 0
    const arr = [3, 6, 5, 8, 10, 9, 7, 12, 14, 13, 18, 25, 20, 15, 11]
    tree.postOrderTraverse((key) => {
      expect(key).toBe(arr[i++])
    })
  })

  test('return min key', () => {
    expect(tree.min()).toBeUndefined()
    insertNodes()
    expect(tree.min()).toBe(3)
    tree.insert(1)
    expect(tree.min()).toBe(1)
  })

  test('return max key', () => {
    expect(tree.max()).toBeUndefined()
    insertNodes()
    expect(tree.max()).toBe(25)
    tree.insert(30)
    expect(tree.max()).toBe(30)
  })

  test('return root node', () => {
    expect(tree.getRoot()).toBeUndefined()
    tree.insert(1)
    expect(tree.getRoot().key).toBe(1)
  })
})
