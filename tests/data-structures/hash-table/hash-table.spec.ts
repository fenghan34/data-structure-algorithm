import { ValuePair, HashTable } from '@/data-structures'

describe('HashTable', () => {
  let hashTable: HashTable<number | string, string>

  beforeEach(() => {
    hashTable = new HashTable<number | string, string>()
  })

  test('generate hash code', () => {
    expect(hashTable.hashCode(1)).toBe(1)
    expect(hashTable.hashCode('123')).toBe(2)
  })

  test('put key and value into hashTable', () => {
    expect(hashTable.put(null, null)).toBeFalsy()
    expect(hashTable.put(1, null)).toBeFalsy()
    expect(hashTable.put(null, '1')).toBeFalsy()
    expect(hashTable.put(1, '1')).toBeTruthy()
    expect(hashTable.get(1)).toBe('1')
    expect(hashTable.put(2, '2')).toBeTruthy()
    expect(hashTable.get(2)).toBe('2')
  })

  test('get value from hashTable', () => {
    expect(hashTable.get(1)).toBeUndefined()

    hashTable.put(1, '1')
    expect(hashTable.get(1)).toBe('1')
    hashTable.put(2, '2')
    expect(hashTable.get(2)).toBe('2')
  })

  test('remove key and value', () => {
    expect(hashTable.remove(1)).toBeFalsy()

    hashTable.put(1, '1')
    hashTable.put(2, '2')
    expect(hashTable.remove(1)).toBeTruthy()
    expect(hashTable.remove(2)).toBeTruthy()
    expect(hashTable.get(1)).toBeUndefined()
    expect(hashTable.get(2)).toBeUndefined()
  })

  test('return table', () => {
    expect(hashTable.getTable()).toEqual({})

    hashTable.put(1, '1')
    hashTable.put('2', '2')
    expect(hashTable.getTable()).toEqual({
      '1': new ValuePair(1, '1'),
      '13': new ValuePair('2', '2'),
    })
  })

  test('return correct size', () => {
    expect(hashTable.size()).toBe(0)
    hashTable.put(1, '1')
    expect(hashTable.size()).toBe(1)
    hashTable.put('2', '2')
    expect(hashTable.size()).toBe(2)
  })

  test('return if the hashTable is empty', () => {
    expect(hashTable.isEmpty()).toBeTruthy()
    hashTable.put(1, '1')
    expect(hashTable.isEmpty()).toBeFalsy()
    hashTable.put('2', '2')
    expect(hashTable.isEmpty()).toBeFalsy()
  })

  test('clear the hashTable', () => {
    hashTable.put(1, '1')
    hashTable.put('2', '2')
    expect(hashTable.size()).toBe(2)
    expect(hashTable.isEmpty()).toBeFalsy()
    hashTable.clear()
    expect(hashTable.size()).toBe(0)
    expect(hashTable.isEmpty()).toBeTruthy()
  })

  test('return primitive string', () => {
    expect(hashTable.toString()).toBe('')

    hashTable.put(1, '1')
    hashTable.put(2, '2')
    expect(hashTable.toString()).toBe('1 => 1:1,2 => 2:2')
  })
})
