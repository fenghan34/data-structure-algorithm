import { AVLTree } from '.'

describe('AVLTree', () => {
  let tree: AVLTree<number>

  beforeEach(() => {
    tree = new AVLTree<number>()
  })

  test('simple lef-left rotation', () => {
    tree.insert(4)
    tree.insert(3)
    tree.insert(2)

    expect(tree.getRoot().key).toBe(3)

    tree.insert(1)

    expect(tree.getRoot().key).toBe(3)

    tree.insert(0)

    expect(tree.getRoot().key).toBe(3)
    expect(tree.getRoot().left.key).toBe(1)
  })

  test('complex left-left rotation', () => {
    tree.insert(30)
    tree.insert(20)
    tree.insert(40)
    tree.insert(10)

    expect(tree.getRoot().key).toBe(30)

    tree.insert(25)
    expect(tree.getRoot().key).toBe(30)

    tree.insert(5)
    expect(tree.getRoot().key).toBe(20)
  })

  test('simple right-right rotation', () => {
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)

    expect(tree.getRoot().key).toBe(3)

    tree.insert(5)

    expect(tree.getRoot().key).toBe(3)

    tree.insert(6)

    expect(tree.getRoot().key).toBe(3)
    expect(tree.getRoot().right.key).toBe(5)
  })

  test('complex right-right rotation', () => {
    tree.insert(30)
    tree.insert(20)
    tree.insert(40)
    tree.insert(50)

    expect(tree.getRoot().key).toBe(30)

    tree.insert(35)
    expect(tree.getRoot().key).toBe(30)

    tree.insert(55)
    expect(tree.getRoot().key).toBe(40)
  })

  test('left-right rotation', () => {
    tree.insert(30)
    tree.insert(20)
    tree.insert(25)

    expect(tree.getRoot().key).toBe(25)
  })

  test('right-left rotation', () => {
    tree.insert(30)
    tree.insert(40)
    tree.insert(35)

    expect(tree.getRoot().key).toBe(35)
  })

  test('should create balanced tree: case #1', () => {
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)

    expect(tree.getRoot().key).toBe(2)

    tree.insert(6)

    expect(tree.getRoot().key).toBe(2)

    tree.insert(15)

    expect(tree.getRoot().key).toBe(2)

    tree.insert(-2)

    expect(tree.getRoot().key).toBe(2)

    tree.insert(-5)

    expect(tree.getRoot().key).toBe(2)

    tree.insert(-8)

    expect(tree.getRoot().key).toBe(2)
  })

  it('should create balanced tree: case #2', () => {
    tree.insert(43)
    tree.insert(18)
    tree.insert(22)
    tree.insert(9)
    tree.insert(21)
    tree.insert(6)

    expect(tree.getRoot().key).toBe(18)

    tree.insert(8)

    expect(tree.getRoot().key).toBe(18)
  })

  test('should do left right rotation and keeping left right node safe 1', () => {
    expect(tree.getRoot()).toBeUndefined()
    tree.insert(30)
    tree.insert(15)
    tree.insert(40)
    tree.insert(10)
    tree.insert(18)
    tree.insert(35)
    tree.insert(45)
    tree.insert(5)
    tree.insert(12)
    tree.insert(11)
  })

  test('should do left right rotation and keeping left right node safe 2', () => {
    expect(tree.getRoot()).toBeUndefined()
    tree.insert(30)
    tree.insert(15)
    tree.insert(40)
    tree.insert(10)
    tree.insert(18)
    tree.insert(35)
    tree.insert(45)
    tree.insert(42)
    tree.insert(47)
    tree.insert(43)
  })

  test('remove nodes from the tree with right-right rotation', () => {
    tree.insert(10)
    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    tree.insert(40)

    tree.remove(10)

    expect(tree.getRoot().key).toBe(30)
    expect(tree.getRoot().left.key).toBe(20)
    expect(tree.getRoot().right.key).toBe(40)
  })

  test('should remove values from the tree with left-left rotation', () => {
    tree.insert(10)
    tree.insert(20)
    tree.insert(30)
    tree.insert(5)
    tree.remove(30)

    expect(tree.getRoot().key).toBe(10)
    expect(tree.getRoot().left.key).toBe(5)
    expect(tree.getRoot().right.key).toBe(20)
  })

  test('should keep balance after removal', () => {
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)
    tree.insert(6)
    tree.insert(7)
    tree.insert(8)
    tree.insert(9)

    expect(tree.getRoot().key).toBe(4)

    tree.remove(8)

    expect(tree.getRoot().key).toBe(4)

    tree.remove(9)

    expect(tree.search(8)).toBeFalsy()
    expect(tree.search(9)).toBeFalsy()
    expect(tree.getRoot().key).toBe(4)
  })
})
