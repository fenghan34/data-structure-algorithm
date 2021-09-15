import { Queue } from '@/data-structures/queue/queue'

describe('Queue', () => {
  let queue: Queue<number>

  beforeEach(() => {
    queue = new Queue<number>()
  })

  test('enqueue element', () => {
    queue.enqueue(1)
    expect(queue.size()).toBe(1)

    queue.enqueue(2)
    expect(queue.size()).toBe(2)

    queue.enqueue(3)
    expect(queue.size()).toBe(3)

    expect(queue.isEmpty()).toBeFalsy()
  })

  test('dequeue element', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBeUndefined()
  })

  test('verify FIFO logic', () => {
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

  test('peek element', () => {
    expect(queue.peek()).toBeUndefined()

    queue.enqueue(1)
    expect(queue.peek()).toBe(1)

    queue.enqueue(2)
    expect(queue.peek()).toBe(1)

    queue.dequeue()
    expect(queue.peek()).toBe(2)
  })

  test('return the queue size', () => {
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

  test('return if the queue is empty', () => {
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

  test('clear the queue', () => {
    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()

    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBeFalsy()

    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()
  })

  test('return primitive string type', () => {
    expect(queue.toString()).toBe('')

    queue.enqueue(1)
    expect(queue.toString()).toBe('1')

    queue.enqueue(2)
    expect(queue.toString()).toBe('1,2')

    queue.clear()
    expect(queue.toString()).toBe('')
  })
})
