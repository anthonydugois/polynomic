import {
  transform,
  transformPath,
  transformOrigin,
  makeMatrix,
  makeVector,
  multiply,
  multiplyVector,
} from "./index"

import { translate } from "../translate"
import { scale } from "../scale"
import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should return a function', () => {
  const test = typeof transform(translate(0, 0))
  const expected = 'function'

  expect(test).toBe(expected)
})

test('should return a function and apply the transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translate(100, 100))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the matrix on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transformPath(makeMatrix(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    100, 100, 0, 1,
  ))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform with a modified origin', () => {
  const path = parse('M0 0h100v100h-100z')
  const transforms = transformPath(makeMatrix(
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ))
  const origin = { x: 50, y: 50 }

  const test = transformOrigin(transforms, origin)(path)
  const expected = 'M-50-50h200v200h-200z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform with a modified relative origin', () => {
  const path = parse('M0 0h100v100h-100z')
  const transforms = transformPath(makeMatrix(
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ))
  const origin = { x: '50%', y: '50%' }

  const test = transformOrigin(transforms, origin)(path)
  const expected = 'M-50-50h200v200h-200z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should return a 4x4 column-major order matrix', () => {
  const test = makeMatrix(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    2, 2, 0, 1,
  )
  const expected = [
    1, 0, 0, 2,
    0, 1, 0, 2,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  expect(test).toEqual(expected)
})

test('should return a 1x4 column-major order matrix', () => {
  const test = makeVector(2, 2, 0, 1)
  const expected = [2, 2, 0, 1]

  expect(test).toEqual(expected)
})

test('should multiply two 4x4 matrices and return the result', () => {
  const test = multiply(
    makeMatrix(3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3),
    makeMatrix(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2),
  )
  const expected = makeMatrix(6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6)

  expect(test).toEqual(expected)
})

test('should multiply a 4x4 matrix with a 1x4 matrix and return the result', () => {
  const test = multiplyVector(
    makeMatrix(3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3),
    makeVector(2, 2, 0, 1),
  )
  const expected = makeVector(6, 6, 0, 3)

  expect(test).toEqual(expected)
})
