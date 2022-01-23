import { Stack } from '../data-structures/stack/stack'

/**
 * 进制转换算法
 * @param {number} decNumber 传入的数字
 * @param {number} base 进制基数
 * @example baseConverter(100345, 2)
 * @returns {string} 转换结果
 */
export const baseConverter = (decNumber: number, base: number): string => {
  const stack = new Stack<number>()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  if (!(base >= 2 && base <= 36)) return ''

  let rem: number
  let result = ''

  while (decNumber > 0) {
    rem = ~~(decNumber % base)
    stack.push(rem)
    decNumber = ~~(decNumber / base)
  }

  while (!stack.isEmpty()) {
    result += digits[stack.pop()]
  }

  return result
}
