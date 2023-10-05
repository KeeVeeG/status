import { TreeStore, Item } from '.'

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
] as Item[]

const store = new TreeStore(items)

describe('Tests', () => {
  test('getAll', () => {
    expect(store.getAll()).toBe(items)
  })

  test('getItem', () => {
    for (const item of items) {
      expect(store.getItem(item.id)).toBe(item)
    }
  })

  test('getChildren', () => {
    expect(store.getChildren(4)).toStrictEqual([items[6], items[7]])
  })

  test('getAllChildren', () => {
    expect(store.getAllChildren(2)).toStrictEqual([
      { id: 2, parent: 1, type: 'test' },
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ])
  })

  test('getAllParents', () => {
    expect(store.getAllParents(7)).toStrictEqual([
      { id: 7, parent: 4, type: null },
      { id: 4, parent: 2, type: 'test' },
      { id: 2, parent: 1, type: 'test' },
      { id: 1, parent: 'root' },
    ])
  })
})
