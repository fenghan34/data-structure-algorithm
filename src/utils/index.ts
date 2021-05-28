export enum Compare {
  LESS_THAN,
  EQUAL,
  BIGGER_THAN,
}

export type CompareFn = (param1: unknown, param2: unknown) => Compare

/**
 * 对比函数  
 */
export const defaultCompare: CompareFn = (param1: unknown, param2: unknown) => {
  return param1 < param2
    ? Compare.LESS_THAN
    : param1 === param2
    ? Compare.EQUAL
    : Compare.BIGGER_THAN
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
