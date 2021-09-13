import { Queue } from '@/data-structures/queue/queue'

describe('Queue', () => {
  let queue: Queue<number>

  beforeEach(() => {
    queue = new Queue<number>()
  })

  test('enqueues elements', () => {
    queue.enqueue(1)
    expect(queue.size()).toBe(1)

    queue.enqueue(2)
    expect(queue.size()).toBe(2)

    queue.enqueue(3)
    expect(queue.size()).toBe(3)

    expect(queue.isEmpty()).toBeFalsy()
  })

  test('dequeues elements', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBeUndefined()
  })

  test('implements FIFO logic', () => {
    queue.enqueue(1)
    expect(queue.peek()).toBe(1)
    queue.enqueue(2)
    expect(queue.peek()).toBe(1)
    queue.enqueue(3)
    expect(queue.peek()).toBe(1)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBeUndefined()
  })

  test('allows to peek at the front element in the queue without dequeuing it', () => {
    expect(queue.peek()).toBeUndefined()

    queue.enqueue(1)
    expect(queue.peek()).toBe(1)

    queue.enqueue(2)
    expect(queue.peek()).toBe(1)

    queue.dequeue()
    expect(queue.peek()).toBe(2)
  })

  test('returns the correct size', () => {
    expect(queue.size()).toBe(0)
    queue.enqueue(1)
    expect(queue.size()).toBe(1)
    queue.enqueue(2)
    expect(queue.size()).toBe(2)

    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()

    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.size()).toBe(2)

    queue.dequeue()
    expect(queue.size()).toBe(1)
    queue.dequeue()
    expect(queue.size()).toBe(0)
  })

  test('returns if it is empty', () => {
    expect(queue.isEmpty()).toBeTruthy()
    queue.enqueue(1)
    expect(queue.isEmpty()).toBeFalsy()
    queue.enqueue(2)
    expect(queue.isEmpty()).toBeFalsy()

    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()

    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBeFalsy()

    queue.dequeue()
    expect(queue.isEmpty()).toBeFalsy()
    queue.dequeue()
    expect(queue.isEmpty()).toBeTruthy()
  })

  test('clears the queue', () => {
    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()

    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBeFalsy()

    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()
  })

  test('returns toString primitive types', () => {
    expect(queue.toString()).toBe('')

    queue.enqueue(1)
    expect(queue.toString()).toBe('1')

    queue.enqueue(2)
    expect(queue.toString()).toBe('1,2')

    queue.clear()
    expect(queue.toString()).toBe('')
  })
})
