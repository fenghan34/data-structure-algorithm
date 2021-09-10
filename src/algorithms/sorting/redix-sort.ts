/**
 * 基数排序 时间复杂度 O(k * n) 空间复杂度 O(k + n)
 * @param array 待排序数组
 * @param radixBase 基数，默认 10
 * @returns 排序后的数组
 */
export const radixSort = (array: number[], radixBase = 10): number[] => {
  if (array.length < 2) {
    return array
  }

  const minValue = Math.min(...array)
  const maxValue = Math.max(...array)

  let significantDigit = 1
  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue)
    significantDigit *= radixBase
  }

  return array
}

/**
 * 基于基数排序
 * @param array 原数组
 * @param radixBase 基数
 * @param significantDigit 当前有效位
 * @param minValue 最小值
 * @returns 基于当前基数排序后的数组
 */
const countingSortForRadix = (
  array: number[],
  radixBase: number,
  significantDigit: number,
  minValue: number
): number[] => {
  let bucketIndex
  const buckets = []
  const aux = []

  for (let i = 0; i < radixBase; i++) {
    // 基于基数初始化桶
    buckets[i] = 0
  }

  for (let i = 0; i < array.length; i++) {
    // 基于当前有效位进行计数排序
    bucketIndex = ~~(((array[i] - minValue) / significantDigit) % radixBase)
    buckets[bucketIndex]++
  }

  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1]
  }

  for (let i = array.length - 1; i >= 0; i--) {
    bucketIndex = ~~(((array[i] - minValue) / significantDigit) % radixBase)
    aux[--buckets[bucketIndex]] = array[i]
  }

  return aux
}
