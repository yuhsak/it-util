import { and, or, difference, xor } from '../src/set'

function* ga() {
  for (let i = 0; i < 10; i++) {
    yield i
  }
}

function* gb() {
  for (let i = 5; i < 15; i++) {
    yield i
  }
}

const a = [...ga()]
const b = [...gb()]

describe('Set', () => {
  describe('and', () => {
    test('yields intersection', () => {
      expect([...and(ga(), b)]).toStrictEqual([5, 6, 7, 8, 9])
      expect([...and(gb(), a)]).toStrictEqual([5, 6, 7, 8, 9])
    })
  })
  describe('or', () => {
    test('yields union', () => {
      expect([...or(ga(), gb())]).toStrictEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
      ])
    })
  })
  describe('difference', () => {
    test('yields difference', () => {
      expect([...difference(ga(), b)]).toStrictEqual([0, 1, 2, 3, 4])
      expect([...difference(gb(), a)]).toStrictEqual([10, 11, 12, 13, 14])
    })
  })
  describe('xor', () => {
    test('yields symmetric difference', () => {
      expect([...xor(a, b)]).toStrictEqual([0, 1, 2, 3, 4, 10, 11, 12, 13, 14])
      expect([...xor(b, a)]).toStrictEqual([10, 11, 12, 13, 14, 0, 1, 2, 3, 4])
    })
  })
})
