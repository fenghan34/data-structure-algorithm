import { SortedLinkedList } from '@/data-structures'

describe('SortedLinkedList', () => {
  let list: SortedLinkedList<number>
  let start: number
  let end: number

  beforeEach(() => {
    list = new SortedLinkedList<number>()
    start = 1
    end = 3
  })

  function execOperation(fn: (index?: number) => void): void {
    for (let i = start; i <= end; i++) {
      fn(i)
    }
  }

  function verifyList(): void {
    let current = list.getHead()

    for (let i = start; i <= end; i++) {
      expect(current).not.toBeUndefined()

      if (current) {
        expect(current.element).toBe(i)

        if (i < end) {
          expect(current.next).not.toBeUndefined()

          if (current.next) {
            expect(current.next.element).toBe(i + 1)
          }
        } else {
          expect(current.next).toBeUndefined()
        }
      }

      current = current.next
    }
  }

  test('push element', () => {
    expect.hasAssertions()
    execOperation((i) => list.push(i))
    verifyList()
  })

  test('insert element', () => {
    expect.hasAssertions()
    execOperation((i) => {
      list.insert(i)
    })
    verifyList()
  })
})
