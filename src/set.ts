import { concat, filter, includes } from './iterable'
import { not } from './util'

export const isin =
  <T>(b: Iterable<T>) =>
  (v: T) =>
    includes(b, v)

export function and<T>(a: Iterable<T>, b: Iterable<T>) {
  return filter(a, isin(b))
}

export function or<T>(a: Iterable<T>, b: Iterable<T>) {
  return concat(a, b)
}

export function difference<T>(a: Iterable<T>, b: Iterable<T>) {
  return filter(a, not(isin(b)))
}

export function xor<T>(a: Iterable<T>, b: Iterable<T>) {
  return concat(difference(a, b), difference(b, a))
}

export { and as intersection, or as union, xor as symmetricDifference }
