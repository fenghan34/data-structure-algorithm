export enum Compare {
  LESS_THAN,
  EQUAL,
  BIGGER_THAN,
}

export interface CompareFn<T = number> {
  (param1: T, param2: T): Compare
}

export interface DiffFn<T = number> {
  (param1: T, param2: T): number
}

/**
 * 对比函数
 */
export const defaultCompare = <T = number>(param1: T, param2: T) => {
  return param1 < param2
    ? Compare.LESS_THAN
    : param1 === param2
    ? Compare.EQUAL
    : Compare.BIGGER_THAN
}

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
  return (a: T, b: T) => compareFn(b, a)
}

/**
 * 交换节点
 */
export function swap<T>(array: T[], a: number, b: number) {
  const temp = array[a]
  array[a] = array[b]
  array[b] = temp

  // ;[array[a], array[b]] = [array[b], array[a]]
}

/**
 * 生成指定长度随机整数数组
 */
export const genRandomIntArray = (length: number, max = 100): number[] => {
  return Array.from({ length }, () => genRandomInt(max))
}

/**
 * 生成随机整数
 */
export const genRandomInt = (max: number) => {
  return ~~(Math.random() * max)
}
