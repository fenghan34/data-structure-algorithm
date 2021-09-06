import { Dictionary } from './dictionary-hashMap'
import { Queue } from './queue'

/**
 * 图
 */
export class Graph<T = string> {
  // 是否有向
  private readonly isDirected: boolean
  // 所有顶点
  private readonly vertices: T[]
  // 邻接表
  private readonly adjList: Dictionary<T, T[]>

  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.vertices = []
    this.adjList = new Dictionary()
  }

  /** 添加顶点 */
  addVertex(v: T) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  /** 连接两个顶点 */
  addEdge(v: T, w: T) {
    if (!this.adjList.get(v)) {
      // 如果顶点 v 不在图中
      this.addVertex(v)
    }

    if (!this.adjList.get(w)) {
      // 如果顶点 w 不在图中
      this.addVertex(w)
    }

    this.adjList.get(v)!.push(w)

    if (!this.isDirected) {
      // 如果图是无向的
      this.adjList.get(w)!.push(v)
    }
  }

  /** 返回顶点列表 */
  getVertices() {
    return this.vertices
  }

  /** 返回邻接表 */
  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = ''

    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])
      for (let j = 0; j < neighbors!.length; j++) {
        s += `${neighbors![j]} `
      }
      s += '\n'
    }
    return s
  }
}

enum Colors {
  /** 未被访问 */
  WHITE,
  /** 被访问，未被探索过 */
  GREY,
  /** 已被访问且被探索过 */
  BLACK,
}

/** 初始化图中每个顶点的颜色 */
const initializeColor = <T>(vertices: T[]): Map<T, Colors> => {
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
  const queue = new Queue()

  queue.enQueue(startVertex)

  while (!queue.isEmpty()) {
    // 取出顶点
    const u = queue.deQueue()
    // 相邻顶点
    const neighbors = adjList.get(u)
    // 记录已被访问过
    colorMap.set(u, Colors.GREY)

    // 遍历所有相邻顶点
    for (let i = 0; i < neighbors!.length; i++) {
      const w = neighbors![i]

      if (colorMap.get(w) === Colors.WHITE) {
        // 记录已为访问过
        colorMap.set(w, Colors.GREY)

        // 记录起始顶点与 w 的距离
        distances.set(w, distances.get(u)! + 1)

        // 记录 w 的前溯点为 u
        predecessors.set(w, u)

        // 入队
        queue.enQueue(w)
      }
    }

    // 记录为已被访问过且被探索过
    colorMap.set(u, Colors.BLACK)

    // 执行回调
    typeof callback === 'function' && callback(u)
  }

  return {
    distances,
    predecessors,
  }
}

/**
 * 深度优先搜索算法
 * @param graph 图实例
 * @param callback 回调函数
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
