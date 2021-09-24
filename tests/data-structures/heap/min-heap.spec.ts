import { MinHeap } from '@/data-structures/heap/min-heap'

describe('MinHeap', () => {
  let heap: MinHeap<number>

  beforeEach(() => {
    heap = new MinHeap()
  })

  test('insert value', () => {
    expect(heap.insert(null)).toBeFalsy()

    expect(heap.insert(3)).toBeTruthy()
    expect(heap.insert(2)).toBeTruthy()
    expect(heap.insert(1)).toBeTruthy()
    expect(heap.size()).toBe(3)
    expect(heap.isEmpty()).toBeFalsy()
  })

  test('return minimum value', () => {
    expect(heap.findMinimum()).toBeUndefined()

    expect(heap.insert(3)).toBeTruthy()
    expect(heap.insert(2)).toBeTruthy()
    expect(heap.insert(1)).toBeTruthy()
    expect(heap.findMinimum()).toBe(1)
    expect(heap.insert(0)).toBeTruthy()
    expect(heap.findMinimum()).toBe(0)
  })

  test('extract minimum value', () => {
    expect(heap.extract()).toBeUndefined()

    expect(heap.insert(1)).toBeTruthy()
    expect(heap.extract()).toBe(1)

    expect(heap.insert(5)).toBeTruthy()
    expect(heap.insert(4)).toBeTruthy()
    expect(heap.insert(3)).toBeTruthy()
    expect(heap.insert(2)).toBeTruthy()
    expect(heap.insert(1)).toBeTruthy()
    expect(heap.extract()).toBe(1)
    expect(heap.extract()).toBe(2)
    expect(heap.extract()).toBe(3)
    expect(heap.extract()).toBe(4)
    expect(heap.extract()).toBe(5)
  })

  test('return if the heap is empty', () => {
    expect(heap.isEmpty()).toBeTruthy()
    expect(heap.insert(3)).toBeTruthy()
    expect(heap.isEmpty()).toBeFalsy()
    expect(heap.insert(2)).toBeTruthy()
    expect(heap.isEmpty()).toBeFalsy()
  })

  test('return correct size', () => {
    expect(heap.size()).toBe(0)
    expect(heap.insert(3)).toBeTruthy()
    expect(heap.size()).toBe(1)
    expect(heap.insert(2)).toBeTruthy()
    expect(heap.size()).toBe(2)
  })
})
