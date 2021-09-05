export enum Compare {
  LESS_THAN,
  EQUAL,
  BIGGER_THAN,
}

export interface CompareFn<T = number> {
  (param1: T, param2: T): Compare
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
 * 生成 0~10 随机数组
 */
export const genRandomArray = (length: number): number[] => {
  return Array.from({ length }, () => ~~(Math.random() * 10))
}
