export enum Compare {
  LESS_THAN,
  EQUAL,
  BIGGER_THAN,
}

export type EqualsFn<T> = (a: T, b: T) => boolean

export type CompareFn<T> = (a: T, b: T) => Compare

export type DiffFn<T> = (a: T, b: T) => number

/**
 * 比较函数
 */
export const defaultCompare = <T = number>(param1: T, param2: T): Compare => {
  if (param1 < param2) {
    return Compare.LESS_THAN
  }

  if (param1 === param2) {
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
 * @returns 差值
 */
export const defaultDiff = <T = number>(param1: T, param2: T): number => {
  if (typeof param1 === 'number' && typeof param2 === 'number') {
    return param1 - param2
  }
  return Number(param1) - Number(param2)
}

/**
 * 反转对比函数（参数位置反转）
 */
export const reverseCompare = <T = number>(compareFn: CompareFn<T>) => {
  return (a: T, b: T): Compare => compareFn(b, a)
}

/**
 * 交换节点
 */
export function swap<T>(array: T[], a: number, b: number): void {
  const temp = array[a]
  array[a] = array[b]
  array[b] = temp

  // ;[array[a], array[b]] = [array[b], array[a]]
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

  if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }

  return item.toString()
}
