import { LinkedList } from '@/data-structures/linked-list/linked-list'
import { defaultEquals } from '@/utils'

describe('LinkedList', () => {
  let list: LinkedList<number>
  let start: number
  let end: number

  beforeEach(() => {
    list = new LinkedList<number>(defaultEquals)
    start = 1
    end = 3
  })

  function execOperation(fn: (index?: number) => void): void {
    for (let i = start; i <= end; i++) {
      fn(i)
    }
  }

  function verifyList(): void {
    let current = list.getHead()

    for (let i = start; i <= end; i++) {
      expect(current).not.toBeUndefined()

      if (current) {
        expect(current.element).toBe(i)

        if (i < end) {
          expect(current.next).not.toBeUndefined()

          if (current.next) {
            expect(current.next.element).toBe(i + 1)
          }
        } else {
          expect(current.next).toBeUndefined()
        }
      }

      current = current.next
    }
  }

  test('initial status', () => {
    expect(list.isEmpty()).toBeTruthy()
    expect(list.size()).toBe(0)
    expect(list.getHead()).toBeUndefined()
  })

  test('push element', () => {
    expect.hasAssertions()
    execOperation((v) => list.push(v))
    verifyList()
  })

  test('return element with invalid index', () => {
    expect(list.getElementAt(3)).toBeUndefined()
  })

  test('return element with specific index', () => {
    execOperation((v) => list.push(v))
    execOperation((v) => expect(list.getElementAt(v - 1).element).toBe(v))
  })

  test('insert element to the first position of empty list', () => {
    expect(list.insert(1, 0)).toBeTruthy()
    end = 1
    verifyList()
  })

  test('insert element to the first position of list', () => {
    const element = 1
    expect(list.insert(1, 0)).toBeTruthy()
    end = element
    verifyList()
  })

  test('insert element to empty list with invalid position', () => {
    expect(list.insert(1, 1)).toBeFalsy()
  })

  test('insert element to not empty list with invalid position', () => {
    const element = 1
    expect(list.insert(element, 0)).toBeTruthy()
    expect(list.insert(element, 2)).toBeFalsy()
  })

  test('insert element to the middle of list', () => {
    expect(list.insert(3, 0)).toBeTruthy()
    expect(list.insert(1, 0)).toBeTruthy()
    expect(list.insert(2, 1)).toBeTruthy()
    verifyList()
  })

  test('insert element to the end of list', () => {
    end = 5
    execOperation((i) => expect(list.insert(i, i - 1)).toBeTruthy())
    verifyList()
  })

  test('return index of element', () => {
    execOperation((v) => list.push(v))
    execOperation((i) => expect(list.indexOf(i)).toBe(i - 1))

    expect(list.indexOf(end + 2)).toBe(-1)
  })

  test('remove valid element', () => {
    execOperation((v) => list.push(v))
    execOperation((i) => expect(list.remove(i)).toBe(i))
  })

  test('remove invalid element', () => {
    execOperation((v) => list.push(v))
    expect(list.remove(end + 1)).toBeUndefined()
  })

  test('remove element with invalid position from list', () => {
    execOperation((v) => list.push(v))
    expect(list.removeAt(end + 2)).toBeUndefined()
  })

  test('remove element with valid position from list', () => {
    execOperation((v) => list.push(v)) // 1,2,3

    const element = list.removeAt(1) // 1,3
    expect(element).toBe(2)

    let current = list.getHead()
    expect(current).not.toBeUndefined()
    expect(current.element).toBe(element - 1)
    expect(current.next).not.toBeUndefined()

    current = current.next
    expect(current.element).toBe(element + 1)
    expect(current.next).toBeUndefined()
  })

  test('return the head of the list', () => {
    expect(list.getHead()).toBeUndefined()

    list.push(1)
    const head = list.getHead()
    expect(head).not.toBeUndefined()
    expect(head.element).toBe(1)
  })

  test('return the list size', () => {
    expect(list.size()).toBe(0)

    execOperation((v) => {
      list.push(v)
      expect(list.size()).toBe(v)
    })

    const size = end
    execOperation((i) => {
      list.remove(i)
      expect(list.size()).toBe(size - i)
    })

    expect(list.size()).toBe(0)
  })

  test('return if the list is empty', () => {
    expect(list.isEmpty()).toBeTruthy()

    execOperation((v) => {
      list.push(v)
      expect(list.isEmpty()).toBeFalsy()
    })

    for (let i = start; i < end; i++) {
      list.remove(i)
      expect(list.isEmpty()).toBeFalsy()
    }

    list.remove(end)
    expect(list.isEmpty()).toBeTruthy()

    execOperation((v) => list.push(v))
    list.clear()
    expect(list.isEmpty()).toBeTruthy()
  })

  it('clear the list', () => {
    expect(list.size()).toBe(0)

    list.clear()
    expect(list.size()).toBe(0)

    execOperation((v) => list.push(v))
    expect(list.size()).toBe(end)

    list.clear()
    expect(list.size()).toBe(0)
  })

  it('return primitive string type', () => {
    expect(list.toString()).toBe('')

    list.push(1)
    expect(list.toString()).toBe('1')

    list.push(2)
    expect(list.toString()).toBe('1,2')

    list.clear()
    expect(list.toString()).toBe('')
  })
})
