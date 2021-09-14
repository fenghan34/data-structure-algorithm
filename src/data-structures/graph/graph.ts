import { Dictionary } from '../dictionary/dictionary'

/**
 * 图
 */
export class Graph<T> {
  // 所有顶点
  private readonly vertices: T[] = []

  // 邻接表
  private readonly adjList: Dictionary<T, T[]> = new Dictionary()

  constructor(private isDirected = false) {}

  /** 添加顶点 */
  addVertex(v: T): void {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  /** 连接两个顶点 */
  addEdge(v: T, w: T): void {
    if (!this.adjList.get(v)) {
      // 如果顶点 v 不在图中
      this.addVertex(v)
    }

    if (!this.adjList.get(w)) {
      // 如果顶点 w 不在图中
      this.addVertex(w)
    }

    this.adjList.get(v).push(w)

    if (!this.isDirected) {
      // 如果图是无向的
      this.adjList.get(w).push(v)
    }
  }

  /** 返回顶点列表 */
  getVertices(): T[] {
    return this.vertices
  }

  /** 返回邻接表 */
  getAdjList(): Dictionary<T, T[]> {
    return this.adjList
  }

  toString(): string {
    let s = ''

    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `
      }
      s += '\n'
    }
    return s
  }
}
