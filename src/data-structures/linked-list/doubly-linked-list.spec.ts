import { DoublyLinkedList } from '.'

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>

  beforeEach(() => {
    list = new DoublyLinkedList<number>()
  })

  test('push element to the end of the list', () => {
    list.push(1)
    expect(list.getHead()).not.toBeUndefined()
    expect(list.getHead().element).toBe(1)
    expect(list.getTail()).not.toBeUndefined()
    expect(list.getTail().element).toBe(1)
    expect(list.isEmpty()).toBeFalsy()
    expect(list.size()).toBe(1)

    list.push(2)
    expect(list.getHead().next).not.toBeUndefined()
    expect(list.getHead().next.element).toBe(2)
    expect(list.getTail()).not.toBeUndefined()
    expect(list.getTail().element).toBe(2)
  })

  test('return element from the list with specific position', () => {
    expect(list.getElementAt(1)).toBeUndefined()

    list.push(1)
    expect(list.getElementAt(0).element).toBe(1)
    expect(list.getElementAt(1)).toBeUndefined()

    list.push(2)
    expect(list.getElementAt(1).element).toBe(2)
  })

  test('remove element from the list with specific position', () => {
    // empty list
    expect(list.removeAt(0)).toBeUndefined()

    // only one element
    list.push(1)
    expect(list.removeAt(0)).toBe(1)
    expect(list.getHead()).toBeUndefined()
    expect(list.getTail()).toBeNull()

    // multiple elements
    const elements = [1, 2, 3, 4, 5]
    elements.forEach(list.push, list)

    // invalid position
    expect(list.removeAt(elements.length)).toBeUndefined()

    // remove from start
    expect(list.removeAt(0)).toBe(1)
    expect(list.getHead().element).toBe(2)
    expect(list.getHead().prev).toBeNull()

    // remove from end
    expect(list.removeAt(3)).toBe(5)
    expect(list.getTail()).toEqual(list.getElementAt(2))
    expect(list.getTail().next).toBeNull()

    // remove from middle
    expect(list.removeAt(1)).toBe(3)
    expect(list.getElementAt(1).element).toBe(4)
    expect(list.getElementAt(0).next).toEqual(list.getElementAt(1))
  })

  test('insert element to the list', () => {
    // empty list
    expect(list.insert(1, 1)).toBeFalsy()
    expect(list.insert(1, 0)).toBeTruthy()
    expect(list.getHead().element).toBe(1)
    expect(list.getTail().element).toBe(1)
    expect(list.size()).toBe(1)
    list.clear()

    // multiple elements
    const elements = [2, 3, 4]
    elements.forEach(list.push, list)
    expect(list.size()).toBe(3)

    // insert to the start
    // [1,2,3,4]
    expect(list.insert(1, 0)).toBeTruthy()
    expect(list.getHead().element).toBe(1)
    expect(list.getHead().next).toEqual(list.getElementAt(1))
    expect(list.getElementAt(1).prev).toEqual(list.getHead())
    expect(list.getElementAt(1).element).toBe(2)
    expect(list.size()).toBe(4)

    // insert to the end
    // [1,2,3,4,5]
    expect(list.insert(5, 4)).toBeTruthy()
    expect(list.getTail()).toEqual(list.getElementAt(4))
    expect(list.getTail().element).toBe(5)
    expect(list.getTail().next).toBeUndefined()
    expect(list.size()).toBe(5)

    // insert to the middle
    // [1,2,4,5]
    list.removeAt(2)
    expect(list.size()).toBe(4)
    // [1,2,3,4,5]
    expect(list.insert(3, 2)).toBeTruthy()
    expect(list.getElementAt(2).element).toBe(3)
    expect(list.getElementAt(2).prev).toEqual(list.getElementAt(1))
    expect(list.getElementAt(2).next).toEqual(list.getElementAt(3))
    expect(list.size()).toBe(5)
  })

  test('return list head', () => {
    expect(list.getHead()).toBeUndefined()

    list.push(1)
    expect(list.getHead().element).toBe(1)

    list.insert(0, 0)
    expect(list.getHead().element).toBe(0)
  })

  test('return list tail', () => {
    expect(list.getTail()).toBeUndefined()

    list.push(1)
    expect(list.getTail().element).toBe(1)

    list.push(2)
    expect(list.getTail().element).toBe(2)

    list.insert(3, 2)
    expect(list.getTail().element).toBe(3)
  })

  test('clear the list', () => {
    list.push(1)
    list.push(2)
    list.push(3)
    list.clear()
    expect(list.size()).toBe(0)
    expect(list.getHead()).toBeUndefined()
    expect(list.getTail()).toBeUndefined()
  })

  test('return reversed primitive string type', () => {
    expect(list.inverseToString()).toBe('')

    list.push(1)
    expect(list.inverseToString()).toBe('1')

    list.push(2)
    expect(list.inverseToString()).toBe('2,1')

    list.push(3)
    expect(list.inverseToString()).toBe('3,2,1')
  })
})
