import { Dictionary, ValuePair } from '@/data-structures'

describe('Dictionary', () => {
  let dictionary: Dictionary<number, number>

  beforeEach(() => {
    dictionary = new Dictionary()
  })

  test('set key and value', () => {
    expect(dictionary.set(null, null)).toBeFalsy()

    expect(dictionary.set(1, 1)).toBeTruthy()
    expect(dictionary.size()).toBe(1)
    expect(dictionary.get(1)).toBe(1)
    expect(dictionary.set(2, 2)).toBeTruthy()
    expect(dictionary.size()).toBe(2)
    expect(dictionary.get(2)).toBe(2)
  })

  test('remove key', () => {
    expect(dictionary.remove(1)).toBeFalsy()

    dictionary.set(1, 1)
    dictionary.set(2, 2)
    expect(dictionary.remove(1)).toBeTruthy()
    expect(dictionary.remove(2)).toBeTruthy()
  })

  test('return if the dictionary has the key', () => {
    expect(dictionary.hasKey(1)).toBeFalsy()

    dictionary.set(1, 1)
    expect(dictionary.hasKey(1)).toBeTruthy()
    dictionary.set(2, 2)
    expect(dictionary.hasKey(2)).toBeTruthy()
  })

  test('get key', () => {
    expect(dictionary.get(1)).toBeUndefined()

    dictionary.set(1, 1)
    dictionary.set(2, 2)
    expect(dictionary.get(1)).toBe(1)
    expect(dictionary.get(2)).toBe(2)
  })

  test('return keys', () => {
    expect(dictionary.keys()).toEqual([])

    dictionary.set(1, 1)
    dictionary.set(2, 2)
    expect(dictionary.keys()).toEqual([1, 2])
  })

  test('return values', () => {
    expect(dictionary.values()).toEqual([])

    dictionary.set(1, 1)
    dictionary.set(2, 2)
    expect(dictionary.values()).toEqual([1, 2])
  })

  test('return keys and values', () => {
    expect(dictionary.keyValues()).toEqual([])

    dictionary.set(1, 1)
    dictionary.set(2, 2)
    expect(dictionary.keyValues()).toEqual([
      new ValuePair(1, 1),
      new ValuePair(2, 2),
    ])
  })

  test('return correct size', () => {
    expect(dictionary.size()).toBe(0)
    dictionary.set(1, 1)
    expect(dictionary.size()).toBe(1)
    dictionary.set(2, 2)
    expect(dictionary.size()).toBe(2)
  })

  test('return if the dictionary is empty', () => {
    expect(dictionary.isEmpty()).toBeTruthy()

    dictionary.set(1, 1)
    expect(dictionary.isEmpty()).toBeFalsy()
    dictionary.set(2, 2)
    expect(dictionary.isEmpty()).toBeFalsy()
  })

  test('clear the dictionary', () => {
    expect(dictionary.isEmpty()).toBeTruthy()
    dictionary.set(1, 1)
    dictionary.set(2, 2)
    expect(dictionary.isEmpty()).toBeFalsy()
    dictionary.clear()
    expect(dictionary.isEmpty()).toBeTruthy()
  })

  test('return primitive string', () => {
    expect(dictionary.toString()).toBe('')
    dictionary.set(1, 1)
    dictionary.set(2, 2)

    expect(dictionary.toString()).toBe('1:1,2:2')
  })

  test('perform the specified action for each element in the dictionary', () => {
    dictionary.set(1, 1)
    dictionary.set(2, 2)
    dictionary.set(3, 3)

    let index = 1
    dictionary.forEach((key, value) => {
      expect(key).toBe(index)
      expect(value).toBe(index++)

      if (index === 3) return false
    })
  })
})
