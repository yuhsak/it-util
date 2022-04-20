import * as I from './iterable'

export const arr = <T>(g: Iterable<T>) => [...g]

export function map<T, U>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => U) {
  return arr(I.map(iterable, callbackfn))
}

export function fill<T, U>(iterable: Iterable<T>, value: U) {
  return arr(I.fill(iterable, value))
}

export function entries<T>(iterable: Iterable<T>) {
  return arr(I.entries(iterable))
}

export function keys<T>(iterable: Iterable<T>) {
  return arr(I.keys(iterable))
}

export function values<T>(iterable: Iterable<T>) {
  return arr(I.values(iterable))
}

export function flatMap<T, U>(
  iterable: Iterable<T>,
  callbackfn: (item: T, index: number) => U | Iterable<U>,
) {
  return arr(I.flatMap(iterable, callbackfn))
}

export function flat<T>(iterable: Iterable<Readonly<T[]>>) {
  return arr(I.flat(iterable))
}

export function concat<T>(...iterables: Iterable<T>[]) {
  return arr(I.concat(...iterables))
}

export function filter<T, S extends T>(
  iterable: Iterable<T>,
  callbackfn: (value: T, index: number) => value is S,
): S[]
export function filter<T>(
  iterable: Iterable<T>,
  callbackfn: (value: T, index: number) => boolean,
): T[]
export function filter<T>(iterable: Iterable<T>, callbackfn: (value: T, index: number) => boolean) {
  return arr(I.filter(iterable, callbackfn))
}

export function slice<T>(iterable: Iterable<T>, start = 0, end?: number) {
  return arr(I.slice(iterable, start, end))
}
