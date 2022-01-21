import { HashMapLinearProbing } from '.'

describe('HashTableLinearProbing', () => {
  let hashTable: HashMapLinearProbing<string | number, string>

  beforeEach(() => {
    hashTable = new HashMapLinearProbing()
  })

  test('put key and value into hashTable', () => {
    expect(hashTable.size()).toBe(0)

    expect(hashTable.put(null, '1')).toBeFalsy()
    expect(hashTable.put(1, null)).toBeFalsy()

    expect(hashTable.put('Jonathan', '1')).toBeTruthy()
    expect(hashTable.put('Jamie', '2')).toBeTruthy()
    expect(hashTable.put('Sue', '3')).toBeTruthy()
    expect(hashTable.size()).toBe(3)
  })

  test('get value from hashTable', () => {
    expect(hashTable.get('Jamie')).toBeUndefined()

    hashTable.put('Jonathan', '1')
    hashTable.put('Jamie', '2')
    hashTable.put('Sue', '3')
    hashTable.put('Aethelwulf', '4')

    expect(hashTable.get('Jonathan')).toBe('1')
    expect(hashTable.get('Aethelwulf')).toBe('4')
    expect(hashTable.get('Jamie')).toBe('2')
    expect(hashTable.get('Sue')).toBe('3')
  })

  test('remove key and value from hashTable', () => {
    expect(hashTable.remove('Jamie')).toBeFalsy()

    hashTable.put('Jonathan', '1')
    hashTable.put('Jamie', '2')
    hashTable.put('Jake', '3')
    hashTable.put('Nathan', '4')
    hashTable.put('Athelstan', '5')
    hashTable.put('Sue', '6')
    hashTable.put('Aethelwulf', '7')
    hashTable.put('Sargeras', '8')
    expect(hashTable.size()).toBe(8)

    expect(hashTable.remove('Aethelwulf')).toBeTruthy()
    expect(hashTable.remove('Sue')).toBeTruthy()
    expect(hashTable.remove('Jonathan')).toBeTruthy()
    expect(hashTable.remove('Jake')).toBeTruthy()
    expect(hashTable.remove('Jamie')).toBeTruthy()
  })
})
