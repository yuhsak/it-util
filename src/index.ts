export class IteratorTypeError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = 'IteratorTypeError'
  }
}

export const isIterable = <T>(obj: any): obj is Iterable<T> => typeof obj[Symbol.iterator] === 'function'

function flatReduce<T, I, A = I>(iterable: Iterable<T>, callbackfn: (previousValue: A | I, nextValue: T, index: number) => A | Iterable<A>, initialValue: I): Generator<A, I | A, undefined>
function flatReduce<T, A = T>(iterable: Iterable<T>, callbackfn: (previousValue: T | A, nextValue: T, index: number) => A | Iterable<T>): Generator<A, T | A, undefined>
function* flatReduce<T, I, A = I>(iterable: Iterable<T>, callbackfn: (previousValue: A | I | T, nextValue: T, index: number) => A | Iterable<A>, initialValue?: I): Generator<A, A | I | T, undefined> {

  let acc: T | I | A | undefined = initialValue
  let i: number = 0

  for (const next of iterable) {
    if (acc !== void (0)) {
      const res = callbackfn(acc, next, i)
      if (isIterable<A | I | T>(res)) {
        for (const item of res) {
          acc = item
          yield acc
        }
      } else {
        acc = res
        yield acc
      }
      i++
    } else {
      acc = next
    }
  }

  if (acc === void (0)) {
    throw new IteratorTypeError('Reduce of empty iterator with no initial value')
  }

  return acc

}

export function reduce<T, I, A = I>(iterable: Iterable<T>, callbackfn: (previousValue: A | I, nextValue: T, index: number) => A, initialValue: I): Generator<A, I | A, undefined>
export function reduce<T, A = T>(iterable: Iterable<T>, callbackfn: (previousValue: T, nextValue: T, index: number) => T): Generator<A, T | A, undefined>
export function reduce<T, I, A = I>(iterable: Iterable<T>, callbackfn: (previousValue: any, nextValue: any, index: number) => any, initialValue?: any) {
  return flatReduce<T, I, A>(iterable, (prev, next, index) => [callbackfn(prev, next, index)], initialValue)
}

export function map<T, U>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => U) {
  return reduce<T, null, U>(iterable, (prev, next, index) => callbackfn(next, index), null)
}

export function forEach<T>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => void) {
  return map(iterable, (value, index) => callbackfn(value, index))
}

export function fill<T, U>(iterable: Iterable<T>, value: U) {
  return map<T, U>(iterable, () => value)
}

export function entries<T>(iterable: Iterable<T>) {
  return map<T, [number, T]>(iterable, (value, index) => [index, value])
}

export function keys<T>(iterable: Iterable<T>) {
  return map(entries(iterable), ([k]) => k)
}

export function values<T>(iterable: Iterable<T>) {
  return map(entries(iterable), ([_, v]) => v)
}

export function flatMap<T, U>(iterable: Iterable<T>, callbackfn: (item: T, index: number) => U | Iterable<U>) {
  return flatReduce<T, null, U>(iterable, (prev, next, index) => callbackfn(next, index), null)
}

export function flat<T>(iterable: Iterable<T[]>) {
  return flatMap<T[], T>(iterable, v => v)
}

export function concat<T>(...iterables: Iterable<T>[]) {
  return flatMap<Iterable<T>, T>(iterables, iterable => iterable)
}

export function filter<T, S extends T>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => value is S): Generator<S, S | null, undefined>
export function filter<T>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => boolean): Generator<T, T | null, undefined>
export function filter<T>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => boolean): Generator<T, T | null, undefined> {
  return flatMap<T, T>(iterable, (value, index) => callbackfn(value, index) ? [value] : [])
}

export function slice<T>(iterable: Iterable<T>, start = 0, end?: number) {
  return filter(iterable, (value, index) => index >= start && (end === void (0) || index < end))
}

export function returnValue<T>(generator: Generator<any, T, undefined>): T {
  let next: IteratorResult<any, T> = generator.next()
  while (!next.done) {
    next = generator.next()
  }
  return next.value
}

export function every<T, S extends T>(iterable: Iterable<T>, predicate: (value: T, index: number) => value is S): iterable is Iterable<S>
export function every<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean): boolean
export function every<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean): boolean {
  return returnValue(flatReduce<T, boolean>(iterable, (prev, next, index) => (prev && !predicate(next, index)) ? [false] : [], true))
}

export function findEntry<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean, fromIndex = 0): [number, T] | [-1, undefined] {
  let index = 0
  for (const value of iterable) {
    if (index >= fromIndex && predicate(value, index)) {
      return [index, value]
    }
    index++
  }
  return [-1, void (0)]
}

export function some<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean) {
  return findEntry(iterable, predicate)[0] !== -1
}

export function findIndex<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean, fromIndex = 0) {
  return findEntry(iterable, predicate, fromIndex)[0]
}

export function find<T>(iterable: Iterable<T>, predicate: (value: T, index: number) => boolean, fromIndex = 0) {
  return findEntry(iterable, predicate, fromIndex)[1]
}

export function indexOf<T>(iterable: Iterable<T>, value: T, fromIndex = 0) {
  return findIndex(iterable, v => v === value, fromIndex)
}

export function includes<T>(iterable: Iterable<T>, value: T) {
  return some(iterable, v => v === value)
}

export function asArray<T>(iterable: Iterable<T>) {
  return [...iterable]
}
