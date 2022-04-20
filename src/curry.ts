import * as S from './set'
import { curry } from './util'

export const and = curry(S.and)

export const or = curry(S.or)

export const difference = curry(S.difference)

export const xor = curry(S.xor)

export const intersection = curry(S.intersection)

export const union = curry(S.union)

export const symmetricDifference = curry(S.symmetricDifference)
