import { Deque } from '@/data-structures/queue/deque'

describe('Dequeue', () => {
  let deque: Deque<number>

  beforeEach(() => {
    deque = new Deque<number>()
  })

  test('starts empty', () => {
    expect(deque.size()).toBe(0)
    expect(deque.isEmpty()).toBeTruthy()
  })

  test('add element in the back', () => {
    deque.addBack(1)
    deque.addBack(2)

    expect(deque.peekBack()).toBe(2)
    expect(deque.size()).toBe(2)
  })

  test('add element in the front', () => {
    deque.addFront(1)
    deque.addFront(2)

    expect(deque.peekFront()).toBe(2)
    expect(deque.size()).toBe(2)
  })

  test('remove element in the back', () => {
    deque.addBack(1)
    deque.addBack(2)
    deque.addFront(0)

    expect(deque.removeBack()).toBe(2)
    expect(deque.removeBack()).toBe(1)
    expect(deque.removeBack()).toBe(0)
    expect(deque.removeBack()).toBeUndefined()
  })

  test('remove element in the front', () => {
    deque.addFront(1)
    deque.addFront(2)
    deque.addBack(0)
    deque.addFront(3)

    expect(deque.removeFront()).toBe(3)
    expect(deque.removeFront()).toBe(2)
    expect(deque.removeFront()).toBe(1)
    expect(deque.removeFront()).toBe(0)
    expect(deque.removeFront()).toBeUndefined()
  })

  test('allows to peek at the front element in the deque without removing it', () => {
    expect(deque.peekFront()).toBeUndefined()

    deque.addFront(1)
    expect(deque.peekFront()).toBe(1)
    deque.addBack(2)
    expect(deque.peekFront()).toBe(1)
    deque.addFront(0)
    expect(deque.peekFront()).toBe(0)
    deque.addFront(-1)
    expect(deque.peekFront()).toBe(-1)
  })

  test('allows to peek at the last element in the deque without removing it', () => {
    expect(deque.peekBack()).toBeUndefined()

    deque.addFront(1)
    expect(deque.peekBack()).toBe(1)
    deque.addBack(2)
    expect(deque.peekBack()).toBe(2)
    deque.addBack(3)
    expect(deque.peekBack()).toBe(3)
    deque.addFront(0)
    expect(deque.peekBack()).toBe(3)
  })

  it('returns the correct size', () => {
    expect(deque.size()).toBe(0)

    deque.addFront(1)
    expect(deque.size()).toBe(1)
    deque.addBack(2)
    expect(deque.size()).toBe(2)
    deque.addBack(3)
    expect(deque.size()).toBe(3)
    deque.addFront(0)
    expect(deque.size()).toBe(4)
    deque.addFront(-1)
    expect(deque.size()).toBe(5)
    deque.addFront(-2)
    expect(deque.size()).toBe(6)

    deque.clear()
    expect(deque.size()).toBe(0)

    deque.addFront(1)
    deque.addBack(2)
    expect(deque.size()).toBe(2)

    deque.removeFront()
    deque.removeBack()
    expect(deque.size()).toBe(0)
  })

  it('returns if it is empty', () => {
    expect(deque.isEmpty()).toBeTruthy()

    deque.addFront(1)
    expect(deque.isEmpty()).toBeFalsy()
    deque.addBack(2)
    expect(deque.isEmpty()).toBeFalsy()

    deque.clear()
    expect(deque.isEmpty()).toBeTruthy()

    deque.addFront(1)
    deque.addBack(2)
    expect(deque.isEmpty()).toBeFalsy()

    deque.removeFront()
    expect(deque.isEmpty()).toBeFalsy()
    deque.removeBack()
    expect(deque.isEmpty()).toBeTruthy()
  })

  it('clears the queue', () => {
    deque.clear()
    expect(deque.isEmpty()).toBeTruthy()

    deque.addFront(1)
    deque.addBack(2)
    expect(deque.isEmpty()).toBeFalsy()

    deque.clear()
    expect(deque.isEmpty()).toBeTruthy()
  })

  it('returns toString primitive types', () => {
    expect(deque.toString()).toBe('')

    deque.addFront(1)
    expect(deque.toString()).toBe('1')

    deque.addBack(2)
    expect(deque.toString()).toBe('1,2')

    deque.clear()
    expect(deque.toString()).toBe('')
  })
})
