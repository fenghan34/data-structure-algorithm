import {
  Compare,
  defaultCompare,
  defaultDiff,
  defaultEquals,
  defaultToString,
  genRandomInt,
  genRandomIntArray,
  reversedDefaultCompare,
  swap,
} from '.'

describe('Utils', () => {
  it('should return correct compared result', () => {
    expect(defaultCompare(1, 0)).toBe(Compare.BIGGER_THAN)
    expect(defaultCompare(1, 1)).toBe(Compare.EQUAL)
    expect(defaultCompare(0, 1)).toBe(Compare.LESS_THAN)
  })

  it('should return if two params are equal', () => {
    expect(defaultEquals(1, 0)).toBe(false)
    expect(defaultEquals(1, 1)).toBe(true)
    expect(defaultEquals({}, {})).toBe(false)
  })

  it('should return difference', () => {
    expect(defaultDiff(1, 0)).toBe(1)
    expect(defaultDiff(1, 1)).toBe(0)
    expect(
      defaultDiff<unknown>(
        {
          [Symbol.toPrimitive]() {
            return 1
          },
        },
        0
      )
    ).toBe(1)
  })

  it('should return reversed compared result', () => {
    expect(reversedDefaultCompare(1, 0)).toBe(Compare.LESS_THAN)
    expect(reversedDefaultCompare(1, 1)).toBe(Compare.EQUAL)
    expect(reversedDefaultCompare(0, 1)).toBe(Compare.BIGGER_THAN)
  })

  it('should swap two elements in place', () => {
    const array = [1, 2, 3]

    swap(array, 0, 1)
    expect(array).toEqual([2, 1, 3])
    swap(array, 0, 1)
    expect(array).toEqual([1, 2, 3])
    swap(array, 0, 2)
    expect(array).toEqual([3, 2, 1])
  })

  it('should return random integer which is lower than specific number', () => {
    expect(genRandomInt(100)).toBeLessThan(100)
    expect(genRandomInt(10)).toBeLessThan(10)
    expect(genRandomInt(1)).toBeLessThan(1)
  })

  it('should return a numeric array with specific length and its elements should lower than passed maximum', () => {
    const genCases = (length: number, max = 100) => {
      const test = genRandomIntArray(length, max)
      expect(test).toHaveLength(length)
      expect(test).toBeInstanceOf(Array)
      test.forEach((v) => {
        expect(v).toBeLessThan(max)
      })
    }
    genCases(10, 10)
    genCases(5, 10)
    genCases(5)
  })

  it('should return primitive string', () => {
    expect(defaultToString(null)).toBe('NULL')
    expect(defaultToString(undefined)).toBe('UNDEFINED')
    expect(defaultToString(1)).toBe('1')
  })
})
