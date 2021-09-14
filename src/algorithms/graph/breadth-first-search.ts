import { Graph } from '../../data-structures/graph/graph'
import { Queue } from '../../data-structures/queue/queue'

export enum Colors {
  /** 未被访问 */
  WHITE,
  /** 被访问，未被探索过 */
  GREY,
  /** 已被访问且被探索过 */
  BLACK,
}

/** 初始化图中每个顶点的颜色 */
export const initializeColor = <T>(vertices: T[]): Map<T, Colors> => {
  const color = new Map<T, Colors>()

  for (let i = 0; i < vertices.length; i++) {
    color.set(vertices[i], Colors.WHITE)
  }

  return color
}

/**
 * 广度优先搜索算法 BFS
 * @param graph 图实例
 * @param startVertex 起始顶点
 * @param callback 回调函数
 * @returns 起始顶点到各顶点的距离与每个顶点的前溯点
 */
export const breadthFirstSearch = <T>(
  graph: Graph<T>,
  startVertex: T,
  callback?: (vertex: T) => void
): { distances: Map<T, number>; predecessors: Map<T, T | null> } => {
  // 所有顶点
  const vertices = graph.getVertices()
  // 邻接表
  const adjList = graph.getAdjList()
  // 记录顶点颜色的 map
  const colorMap = initializeColor<T>(vertices)

  // 记录起始顶点与各顶点的距离
  const distances = new Map<T, number>()

  // 记录前溯顶点
  const predecessors = new Map<T, T | null>()

  // 初始化
  for (let i = 0; i < vertices.length; i++) {
    distances.set(vertices[i], 0)
    predecessors.set(vertices[i], null)
  }

  // 队列
  const queue = new Queue<T>()

  queue.enqueue(startVertex)

  while (!queue.isEmpty()) {
    // 取出顶点
    const u = queue.dequeue()
    // 相邻顶点
    const neighbors = adjList.get(u)
    // 记录已被访问过
    colorMap.set(u, Colors.GREY)

    // 遍历所有相邻顶点
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]

      if (colorMap.get(w) === Colors.WHITE) {
        // 记录已为访问过
        colorMap.set(w, Colors.GREY)

        // 记录起始顶点与 w 的距离
        distances.set(w, distances.get(u) + 1)

        // 记录 w 的前溯点为 u
        predecessors.set(w, u)

        // 入队
        queue.enqueue(w)
      }
    }

    // 记录为已被访问过且被探索过
    colorMap.set(u, Colors.BLACK)

    // 执行回调
    if (typeof callback === 'function') {
      callback(u)
    }
  }

  return {
    distances,
    predecessors,
  }
}
