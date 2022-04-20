export const curry =
  <T, R>(fn: (a: T, b: T) => R) =>
  (a: T) =>
  (b: T) =>
    fn(a, b)

export const not =
  <T>(predicate: (value: T, index: number) => boolean) =>
  (value: T, index: number) =>
    !predicate(value, index)
