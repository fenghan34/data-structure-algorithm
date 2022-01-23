import { baseConverter } from './base-converter'

describe('Base Converter', () => {
  it('should return corresponding string', () => {
    expect(baseConverter(10, 1)).toBe('')
    expect(baseConverter(10, 2)).toBe('1010')
    expect(baseConverter(10, 8)).toBe('12')
    expect(baseConverter(10, 16)).toBe('A')
  })
})
