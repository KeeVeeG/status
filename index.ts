type Id = number | string
export type Item = { id: Id; parent: Id | 'root'; type?: string | null }
type _Node = { item: Item; childs: _Node[]; parent: _Node | null }

export class TreeStore {
  private readonly tree = new Map<Id, _Node>()

  constructor(private readonly items: Item[]) {
    for (const item of items) {
      const node = { item, childs: [], parent: null }
      this.tree.set(item.id, node)
    }
    for (const item of items) {
      const node = this.tree.get(item.id) as _Node
      if (item.parent !== 'root') {
        const parent = this.tree.get(item.parent)
        if (parent) {
          parent.childs.push(node)
          node.parent = parent
        }
      }
    }
  }

  getAll() {
    return this.items
  }

  getItem(id: Id) {
    return this.tree.get(id)?.item
  }

  getChildren(id: Id) {
    return this.tree.get(id)?.childs.map(e => e.item)
  }

  getAllChildren(id: Id) {
    const node = this.tree.get(id)
    if (!node) return []
    const nodes = [node] as _Node[]
    for (let i = 0; i < nodes.length; i++) {
      const childs = nodes[i]?.childs
      if (childs) {
        nodes.push(...childs)
      }
    }
    return nodes.map(e => e.item)
  }

  getAllParents(id: Id) {
    const node = this.tree.get(id)
    if (!node) return []
    const nodes = [node] as _Node[]
    for (let i = 0; i < nodes.length; i++) {
      const parent = nodes[i]?.parent
      if (parent) {
        nodes.push(parent)
      }
    }
    return nodes.map(e => e.item)
  }
}
