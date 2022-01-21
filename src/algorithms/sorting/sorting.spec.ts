import { bubbleSort } from './bubble-sort'

describe('Sorting', () => {
  describe('Bubble Sort', () => {
    it('should return an sorted array', () => {
      expect(bubbleSort([3, 5, 4, 2, 1])).toEqual([1, 2, 3, 4, 5])
      expect(bubbleSort([4, 5, 3, 1, 2])).toEqual([1, 2, 3, 4, 5])
      expect(bubbleSort([2, 1, 5, 3, 4])).toEqual([1, 2, 3, 4, 5])
    })
  })
})
