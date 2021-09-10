/**
 * 计数排序 时间复杂度 O(n + k) 空间复杂度 O(n + k)
 * @param array 待排序整数数组
 * @returns 排序后的数组
 */
export const countingSort = (array: number[]): number[] => {
  if (array.length < 2) return array

  const counts = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    counts[element] >= 1 ? counts[element]++ : (counts[element] = 1)
  }

  let index = 0
  for (let j = 0; j < counts.length; j++) {
    let count = counts[j]

    while (count > 0) {
      array[index++] = j
      count--
    }
  }

  return array
}
