export enum Compare {
  LESS_THAN = -1,
  EQUAL = 0,
  BIGGER_THAN = 1,
}

export type EqualsFn<T> = (a: T, b: T) => boolean

export type CompareFn<T> = (a: T, b: T) => Compare

export type DiffFn<T> = (a: T, b: T) => number

/**
 * 比较函数
 */
export const defaultCompare = <T = number>(a: T, b: T): Compare => {
  if (a < b) {
    return Compare.LESS_THAN
  }

  if (a === b) {
    return Compare.EQUAL
  }

  return Compare.BIGGER_THAN
}

/**
 * 两个参数是否相等
 */
export const defaultEquals = <T>(a: T, b: T): boolean => a === b

/**
 * 计算两数之差
 */
export const defaultDiff = <T = number>(a: T, b: T): number => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  return Number(a) - Number(b)
}

/**
 * 反转对比函数
 */
export const reversedDefaultCompare = <T = number>(a: T, b: T) => {
  return defaultCompare(b, a)
}

/**
 * 交换节点
 */
export function swap(array: unknown[], a: number, b: number): void {
  const temp = array[a]
  array[a] = array[b]
  array[b] = temp
}

/**
 * 生成随机整数
 */
export const genRandomInt = (max: number): number => {
  return ~~(Math.random() * max)
}

/**
 * 生成指定长度随机整数数组
 */
export const genRandomIntArray = (length: number, max = 100): number[] => {
  return Array.from({ length }, () => genRandomInt(max))
}

/**
 * 转字符串
 */
export const defaultToString = (item: unknown): string => {
  if (item === null) {
    return 'NULL'
  }

  if (item === undefined) {
    return 'UNDEFINED'
  }

  return item + ''
}
