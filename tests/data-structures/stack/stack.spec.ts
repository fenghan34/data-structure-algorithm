import { Stack } from '@/data-structures'

describe('Stack', () => {
  let stack: Stack<number>

  beforeEach(() => {
    stack = new Stack<number>()
  })

  test('push element', () => {
    stack.push(1)
    stack.push(2)

    expect(stack.size()).toBe(2)
    expect(stack.peek()).toBe(2)
  })

  test('pop element', () => {
    stack.push(1)
    stack.push(2)

    expect(stack.pop()).toBe(2)
    stack.push(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(1)
    expect(stack.pop()).toBeUndefined()
  })

  test('verify LIFO logic', () => {
    stack.push(1)
    expect(stack.peek()).toBe(1)

    stack.push(2)
    expect(stack.peek()).toBe(2)

    stack.push(3)
    expect(stack.peek()).toBe(3)

    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.pop()).toBeUndefined()
  })

  test('peek element', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)

    expect(stack.peek()).toBe(3)

    stack.pop()
    expect(stack.peek()).toBe(2)

    stack.pop()
    expect(stack.peek()).toBe(1)

    stack.pop()
    expect(stack.peek()).toBeUndefined()
  })

  test('return if the stack is empty', () => {
    expect(stack.isEmpty()).toBeTruthy()

    stack.push(1)
    stack.push(2)
    expect(stack.isEmpty()).toBeFalsy()

    stack.pop()
    expect(stack.isEmpty()).toBeFalsy()
    stack.pop()
    expect(stack.isEmpty()).toBeTruthy()
  })

  test('return the stack size', () => {
    expect(stack.size()).toBe(0)

    stack.push(1)
    stack.push(2)
    expect(stack.size()).toBe(2)

    stack.pop()
    expect(stack.size()).toBe(1)
    stack.pop()
    expect(stack.size()).toBe(0)

    stack.push(3)
    expect(stack.size()).toBe(1)
  })

  test('clear the stack', () => {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.clear()

    expect(stack.size()).toBe(0)
    expect(stack.isEmpty()).toBeTruthy()
  })

  test('return primitive string type', () => {
    expect(stack.toString()).toBe('')

    stack.push(1)
    expect(stack.toString()).toBe('1')

    stack.push(2)
    expect(stack.toString()).toBe('1,2')

    stack.push(3)
    expect(stack.toString()).toBe('1,2,3')
  })
})
