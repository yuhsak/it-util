# it-util

## Install

```sh
npm install it-util
```

## Usage

```ts
import {flat, flatMap, map, filter, slice, concat, reduce, returnValue} from 'it-util'

function* gen() {
  yield [10, 11, 12]
  yield [13, 14, 15]
  yield [16, 17, 18]
}

// Generator<[10, 11, 12, 13, 14, 15, 16, 17, 18]>
const flatGen = flat(gen())

// Generator<[1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8]>
const flatMapGen = flatMap(flatGen, v => String(v).split('').map(Number))

// Generator<[3, 0, 3, 3, 3, 6, 3, 9, 3, 12, 3, 15, 3, 18, 3, 21, 3, 24]>
const mapGen = map(flatMapGen, v => v * 3)

// Generator<[0, 6, 12, 18, 24]>
const filterGen = filter(mapGen, v % 2 === 0)

// Generator<[0, 1, 2, 0, 6, 12, 18, 24, 3, 4, 5]>
const concatGen = concat(
  [0, 1, 2],
  filterGen,
  [3, 4, 5]
)

// Generator<[1, 2, 0, 6, 12, 18, 24, 3]>
const sliceGen = slice(concatGen, 1, 9)

// Generator<[3, 3, 9, 21, 39, 63, 66]>
const reduceGen = reduce(sliceGen, (a, b) => a + b)

// 66
console.log(returnValue(reduceGen))
```
