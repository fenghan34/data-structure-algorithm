import { MaxHeap } from '.'

describe('MaxHeap', () => {
  let heap: MaxHeap<number>

  beforeEach(() => {
    heap = new MaxHeap<number>()
  })

  test('return maximum value', () => {
    expect(heap.findMaximum()).toBeUndefined()
    expect(heap.insert(1)).toBeTruthy()
    expect(heap.insert(2)).toBeTruthy()
    expect(heap.insert(3)).toBeTruthy()
    expect(heap.findMaximum()).toBe(3)
  })
})
