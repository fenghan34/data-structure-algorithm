import { Dictionary } from '../../data-structures/dictionary/dictionary'
import { Graph } from '../../data-structures/graph/graph'
import { Colors, initializeColor } from './breadth-first-search'

/**
 * 深度优先搜索算法
 * @param graph 图实例
 * @param callback 回调函数
 * @returns 每个顶点被访问时间,每个顶点完成探索时间,每个顶点的前溯点
 */
export const depthFirstSearch = <T>(
  graph: Graph<T>,
  callback?: (vertex: T) => void
) => {
  // 所有顶点
  const vertices = graph.getVertices()
  // 邻接表
  const adjList = graph.getAdjList()
  // 记录顶点颜色的 map
  const colorMap = initializeColor<T>(vertices)
  // 记录每个顶点被访问时间
  const d = new Map<T, number>()
  // 记录每个顶点完成探索时间
  const f = new Map<T, number>()
  // 记录每个顶点的前溯点
  const p = new Map<T, T | null>()

  // 时间
  const time = { count: 0 }

  for (let i = 0; i < vertices.length; i++) {
    d.set(vertices[i], 0)
    f.set(vertices[i], 0)
    p.set(vertices[i], null)
  }

  for (let i = 0; i < vertices.length; i++) {
    if (colorMap.get(vertices[i]) === Colors.WHITE) {
      depthFirstSearchVisit(
        vertices[i],
        colorMap,
        d,
        f,
        p,
        time,
        adjList,
        callback
      )
    }
  }

  function depthFirstSearchVisit(
    u: T,
    colorMap: Map<T, Colors>,
    d: Map<T, number>,
    f: Map<T, number>,
    p: Map<T, T | null>,
    time: { count: number },
    adjList: Dictionary<T, T[]>,
    callback?: (v: T) => void
  ) {
    // 记录为已被访问过
    colorMap.set(u, Colors.GREY)

    // 记录访问时间
    d.set(u, ++time.count)

    typeof callback === 'function' && callback(u)

    // 所有相邻顶点
    const neighbors = adjList.get(u)

    for (let i = 0; i < neighbors!.length; i++) {
      const w = neighbors![i]

      if (colorMap.get(w) === Colors.WHITE) {
        // 记录前溯点
        p.set(w, u)

        depthFirstSearchVisit(w, colorMap, d, f, p, time, adjList, callback)
      }
    }

    colorMap.set(u, Colors.BLACK)

    f.set(u, ++time.count)
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p,
  }
}
