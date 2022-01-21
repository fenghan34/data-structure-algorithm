import { binarySearch, binarySearchRecursive, interpolationSearch } from '.'

describe('Search', () => {
  const testSearchAlgorithm = (algorithm: (...args: any[]) => number): void => {
    const case1 = [[1], 1]
    const res1 = 0

    const case2 = [[1, 2, 3, 4, 5], 0]
    const res2 = -1

    const case3 = [[1, 2, 3, 4, 5], 1]
    const res3 = 0

    const case4 = [[1, 2, 3, 4, 5], 3]
    const res4 = 2

    const case5 = [[1, 2, 3, 4, 5], 5]
    const res5 = 4

    const case6 = [[1, 2, 3, 4], 2]
    const res6 = 1

    expect(algorithm(...case1)).toBe(res1)
    expect(algorithm(...case2)).toBe(res2)
    expect(algorithm(...case3)).toBe(res3)
    expect(algorithm(...case4)).toBe(res4)
    expect(algorithm(...case5)).toBe(res5)
    expect(algorithm(...case6)).toBe(res6)
  }

  it('should return correct index', () => {
    expect.hasAssertions()

    testSearchAlgorithm(binarySearch)
    testSearchAlgorithm(binarySearchRecursive)
    testSearchAlgorithm(interpolationSearch)
  })
})
