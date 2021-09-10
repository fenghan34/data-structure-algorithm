import { swap } from '../../utils'

/**
 * 桶排序 平均时间复杂度 O(n + k)  空间复杂度 O(n * k)
 * @param array 待排序整数数组
 * @param num 桶数量
 * @returns 排序后的数组
 */
export const bucketSort = (array: number[], num: number) => {
  const max = Math.max(...array)
  const min = Math.min(...array)

  const buckets: number[][] = []
  // 每个桶大小
  const bucketsSize = Math.floor((max - min) / num) + 1

  for (let i = 0; i < array.length; i++) {
    const bucketIndex = ~~(array[i] / bucketsSize)

    if (!buckets[bucketIndex]) {
      buckets[bucketIndex] = []
    }

    const bucket = buckets[bucketIndex]
    bucket.push(array[i])

    // 每次插入后排序
    let l = bucket.length - 1
    while (l > 0) {
      if (bucket[l] < bucket[l - 1]) {
        swap(bucket, l, l - 1)
      }
      l--
    }
  }

  const sortedArray = []
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] && sortedArray.push(...buckets[i])
  }

  return sortedArray
}
