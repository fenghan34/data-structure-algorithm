import { Deque } from '../data-structures/queue/deque'

/**
 * 检查字符串是否是回文
 * @param {string} str 传入字符串
 * @example palindromeChecker('abcba')
 * @returns 是否是回文
 */
export const palindromeChecker = (str: string): boolean => {
  if (!str || str.length === 0) return false

  const deque = new Deque()
  for (let i = 0; i < str.length; i++) {
    deque.addBack(str[i])
  }

  while (deque.size() > 1) {
    if (deque.removeFront() !== deque.removeBack()) {
      return false
    }
  }

  return true
}
