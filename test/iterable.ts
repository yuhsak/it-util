import { describe, test, expect } from 'vitest'
import { reduce, value, IteratorTypeError, map } from '../src/iterable.js'

function* g() {
  for (let i = 0; i < 10; i++) {
    yield i
  }
}

const add = (a: number, b: number) => a + b
const mul2 = (a: number) => a * 2

describe('Array', () => {
  describe('reduce', () => {
    test('yields value', () => {
      expect([...reduce(g(), add)]).toStrictEqual([1, 3, 6, 10, 15, 21, 28, 36, 45])
    })
    test('returns value', () => {
      expect(value(reduce(g(), add))).toBe(45)
    })
    test('works with initial value', () => {
      expect(value(reduce(g(), add, 10))).toBe(55)
    })
    test('throws error if it gives an empty iterable without initial value', () => {
      expect(() => value(reduce([], add))).toThrowError(IteratorTypeError)
    })
    test('returns initial value if it gives an empty iterable with initial value', () => {
      expect(value(reduce([], add, 42))).toBe(42)
    })
  })

  describe('map', () => {
    test('yields value', () => {
      expect([...map(g(), mul2)]).toStrictEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18])
    })
    test('yields nothing if it gives an empty iterable', () => {
      expect([...map([], mul2)]).toStrictEqual([])
    })
    test('returns last value', () => {
      expect(value(map(g(), mul2))).toBe(18)
    })
    test('returns null if it gives an empty iterable', () => {
      expect(value(map([], mul2))).toBe(null)
    })
  })
})
