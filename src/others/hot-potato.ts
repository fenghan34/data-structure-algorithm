import { Queue } from '../data-structures/queue/queue'

/**
 * 模拟击鼓传花
 * @param {Array} list - 参与游戏人员列表
 * @param {number} num - 传递次数
 * @returns 淘汰人员列表与胜出者
 */
export const hotPotato = (
  list: Array<string>,
  num: number
): { outList: string[]; winner: string } => {
  const queue = new Queue<string>()
  const outList = []

  for (let i = 0; i < list.length; i++) {
    queue.enqueue(list[i])
  }

  while (queue.size() > 1) {
    for (let j = 0; j < num; j++) {
      queue.enqueue(queue.dequeue())
    }

    outList.push(queue.dequeue())
  }

  return {
    outList,
    winner: queue.dequeue(),
  }
}
