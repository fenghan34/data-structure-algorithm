import { HashMapSeparateChaining } from '.'

describe('HashTableSeparateChaining', () => {
  let hashTable: HashMapSeparateChaining<string | number, string>

  beforeEach(() => {
    hashTable = new HashMapSeparateChaining()
  })

  test('put key and value into hashTable', () => {
    expect(hashTable.isEmpty()).toBeTruthy()
    expect(hashTable.size()).toBe(0)

    expect(hashTable.put(null, '1')).toBeFalsy()
    expect(hashTable.put(1, null)).toBeFalsy()

    expect(hashTable.put(1, '1')).toBeTruthy()
    expect(hashTable.size()).toBe(1)
    expect(hashTable.isEmpty()).toBeFalsy()
    expect(hashTable.get(1)).toBe('1')

    expect(hashTable.put('123', '1')).toBeTruthy()
    expect(hashTable.size()).toBe(2)
    expect(hashTable.isEmpty()).toBeFalsy()
    expect(hashTable.get('123')).toBe('1')
  })

  test('get value from hashTable', () => {
    expect(hashTable.get('1')).toBeUndefined()

    // { 5: { key: 'Jonathan', value: '1' } }
    hashTable.put('Jonathan', '1')
    expect(hashTable.hashCode('Jonathan')).toBe(5)
    expect(hashTable.get('Jonathan')).toBe('1')

    // { 5: { key: 'Jonathan', value: '1', next: { key: 'Jamie', value: '2' } } }
    hashTable.put('Jamie', '2')
    expect(hashTable.hashCode('Jamie')).toBe(5)
    expect(hashTable.get('Jamie')).toBe('2')

    // { 5: { key: 'Jonathan', value: '1', next: { key: 'Jamie', value: '2', next: { key: 'Sue', value: '3' } } } }
    hashTable.put('Sue', '3')
    expect(hashTable.hashCode('Sue')).toBe(5)
    expect(hashTable.get('Sue')).toBe('3')
  })

  test('remove key and value from hashTable', () => {
    expect(hashTable.remove(1)).toBeFalsy()

    hashTable.put('Jonathan', '1')
    hashTable.put('Jamie', '2')
    hashTable.put('Sue', '3')
    expect(hashTable.remove('Sue')).toBeTruthy()
    expect(hashTable.remove('Jamie')).toBeTruthy()
    expect(hashTable.remove('Jonathan')).toBeTruthy()
  })
})
