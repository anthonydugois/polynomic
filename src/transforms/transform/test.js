import {
  transform,
  transformPath,
  applyMatrix,
  multiply,
  multiplyVector,
} from "./index"

import { translate } from "../translate"
import { scale } from "../scale"
import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should return a function and apply the transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translate(100, 100))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the matrix on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')
  const matrix = [
    1, 0, 0, 100,
    0, 1, 0, 100,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  const test = applyMatrix(path, matrix)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform with a modified origin', () => {
  const path = parse('M0 0h100v100h-100z')
  const matrix = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  const test = transformPath(path, matrix, { transformOrigin: { x: 50, y: 50 }})
  const expected = 'M-50-50h200v200h-200z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply the transform with a modified relative origin', () => {
  const path = parse('M0 0h100v100h-100z')
  const matrix = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]

  const test = transformPath(path, matrix, { transformOrigin: { x: 50, y: 50 }})
  const expected = 'M-50-50h200v200h-200z'

  expect(isEqual(test, expected)).toBe(true)
})

test('should multiply two 4x4 matrices and return the result', () => {
  const m1 = [
    3, 0, 0, 0,
    0, 3, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 3,
  ]
  const m2 = [
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 2,
  ]

  const test = multiply(m1, m2)
  const expected = [
    6, 0, 0, 0,
    0, 6, 0, 0,
    0, 0, 6, 0,
    0, 0, 0, 6,
  ]

  expect(test).toEqual(expected)
})

test('should multiply a 4x4 matrix with a 1x4 matrix and return the result', () => {
  const m = [
    3, 0, 0, 0,
    0, 3, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 3,
  ]
  const v = [2, 2, 0, 1]

  const test = multiplyVector(m, v)
  const expected = [6, 6, 0, 3]

  expect(test).toEqual(expected)
})
