import { CircularLinkedList } from '@/data-structures'

describe('CircularLinkedList', () => {
  let list: CircularLinkedList<number>

  beforeEach(() => {
    list = new CircularLinkedList<number>()
  })

  test('push element to the end of list', () => {
    expect(list.isEmpty()).toBeTruthy()
    expect(list.size()).toBe(0)

    // empty list
    list.push(1)
    expect(list.getHead().element).toBe(1)
    expect(list.getHead().next).toEqual(list.getHead())

    // not empty list
    list.push(2)
    expect(list.getElementAt(1).element).toBe(2)
    expect(list.getElementAt(1).next).toEqual(list.getHead())
    expect(list.size()).toBe(2)
  })

  test('insert element', () => {
    // empty list
    expect(list.insert(2, 2)).toBeFalsy()
    expect(list.insert(3, 0)).toBeTruthy() // [3]
    expect(list.getHead().element).toBe(3)
    expect(list.getHead().next).toEqual(list.getHead())

    // not empty list
    // insert element to start
    expect(list.insert(1, 0)).toBeTruthy() // [1, 3]
    expect(list.getHead().element).toBe(1)
    expect(list.getHead().next.element).toBe(3)
    expect(list.getElementAt(1).element).toBe(3)
    expect(list.getElementAt(1).next).toEqual(list.getHead())

    // insert element after start
    expect(list.insert(2, 1)).toBeTruthy() // [1, 2, 3]
    expect(list.getElementAt(1).element).toBe(2)
    expect(list.getElementAt(0).next).toBe(list.getElementAt(1))
  })

  test('remove element from list in specific position', () => {
    // empty list
    expect(list.removeAt(0)).toBeUndefined()
    expect(list.removeAt(1)).toBeUndefined()

    // not empty list
    // only one element
    list.push(1) // [1]
    expect(list.size()).toBe(1)
    expect(list.removeAt(0)).toBe(1)
    expect(list.getHead()).toBeNull()
    expect(list.size()).toBe(0)

    // multiple elements
    // remove element form start
    list.push(1)
    list.push(2)
    list.push(3) // [1, 2, 3]
    expect(list.removeAt(0)).toBe(1) // [2, 3]
    expect(list.getElementAt(1).next).toEqual(list.getHead())
    expect(list.size()).toBe(2)

    // remove element after start
    list.insert(1, 0) // [1, 2, 3]
    expect(list.size()).toBe(3)
    expect(list.removeAt(1)).toBe(2) // [1, 3]
    expect(list.getElementAt(0).next).toEqual(list.getElementAt(1))
    expect(list.size()).toBe(2)
    expect(list.removeAt(1)).toBe(3) // [1]
    expect(list.getElementAt(0).element).toBe(1)
    expect(list.getHead().next).toEqual(list.getHead())
  })
})
