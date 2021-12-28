import { Set } from '@/data-structures'

describe('Set', () => {
  let set: Set<number>

  beforeEach(() => {
    set = new Set<number>()
  })

  test('add element', () => {
    expect(set.size).toBe(0)

    expect(set.add(1)).toBeTruthy()
    expect(set.has(1)).toBeTruthy()
    expect(set.size).toBe(1)
    expect(set.add(1)).toBeFalsy()
  })

  test('return if the set has the element', () => {
    expect(set.has(1)).toBeFalsy()
    expect(set.add(1)).toBeTruthy()
    expect(set.has(1)).toBeTruthy()

    expect(set.has(2)).toBeFalsy()
    expect(set.add(2)).toBeTruthy()
    expect(set.has(2)).toBeTruthy()
  })

  test('delete element', () => {
    expect(set.delete(1)).toBeFalsy()
    expect(set.add(1)).toBeTruthy()
    expect(set.delete(1)).toBeTruthy()

    expect(set.delete(2)).toBeFalsy()
    expect(set.add(2)).toBeTruthy()
    expect(set.delete(2)).toBeTruthy()
  })

  test('return correct size', () => {
    expect(set.size).toBe(0)

    set.add(1)
    expect(set.size).toBe(1)
    set.add(2)
    expect(set.size).toBe(2)
  })

  test('clear the set', () => {
    expect(set.size).toBe(0)
    set.add(1)
    set.add(2)
    expect(set.size).toBe(2)
    set.clear()
    expect(set.size).toBe(0)
  })

  test('return keys', () => {
    expect(set.keys()).toEqual([])

    set.add(1)
    set.add(2)
    expect(set.keys()).toEqual(['1', '2'])
  })

  test('return values', () => {
    expect(set.values()).toEqual([])

    set.add(1)
    set.add(2)
    expect(set.values()).toEqual([1, 2])
  })

  test('return entries', () => {
    expect(set.entries()).toEqual([])

    set.add(1)
    set.add(2)
    expect(set.entries()).toEqual([
      ['1', 1],
      ['2', 2],
    ])
  })

  test('return primitive string type', () => {
    expect(set.toString()).toBe('')

    set.add(1)
    set.add(2)
    expect(set.toString()).toBe('1,2')
  })

  test('return iterator', () => {
    set.add(1)
    set.add(2)

    expect([...set]).toEqual([1, 2])

    const iterator = set[Symbol.iterator]()
    expect(iterator.next()).toEqual({ value: 1, done: false })
    expect(iterator.next()).toEqual({ value: 2, done: false })
    expect(iterator.next()).toEqual({ value: undefined, done: true })
  })

  test('calculate union', () => {
    const anotherSet = new Set<number>([])

    expect(set.union(anotherSet)).toEqual(
      new Set<number>([...set, ...anotherSet])
    )

    set.add(1)
    set.add(2)
    anotherSet.add(3)
    anotherSet.add(4)
    expect(set.union(anotherSet)).toEqual(
      new Set<number>([...set, ...anotherSet])
    )
  })

  test('calculate intersection', () => {
    const anotherSet = new Set<number>([])

    expect(set.intersection(anotherSet)).toEqual(new Set<number>([]))

    set.add(1)
    set.add(2)
    set.add(4)
    anotherSet.add(1)
    anotherSet.add(4)
    expect(set.intersection(anotherSet)).toEqual(new Set<number>([1, 4]))

    anotherSet.add(2)
    anotherSet.add(3)
    expect(set.intersection(anotherSet)).toEqual(new Set<number>([1, 4, 2]))
  })

  test('calculate difference', () => {
    const anotherSet = new Set<number>([])

    expect(set.difference(anotherSet)).toEqual(new Set<number>([]))

    set.add(1)
    set.add(2)
    anotherSet.add(1)
    expect(set.difference(anotherSet)).toEqual(new Set<number>([2]))
  })

  test('return if the set is included by another set', () => {
    const anotherSet = new Set<number>([])

    expect(set.isSubSetOf(anotherSet)).toBeTruthy()

    set.add(1)
    expect(set.isSubSetOf(anotherSet)).toBeFalsy()

    set.add(2)
    anotherSet.add(1)
    anotherSet.add(4)
    expect(set.isSubSetOf(anotherSet)).toBeFalsy()

    anotherSet.add(2)
    expect(set.isSubSetOf(anotherSet)).toBeTruthy()
  })
})
