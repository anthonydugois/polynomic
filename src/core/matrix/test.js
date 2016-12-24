import {
  mat,
  identity,
  det,
  inverse,
  multiply,
  multiplyVec,
} from './index'

import { vec } from '../vector'

test('should return an array with a length of 16 in column-major order', () => {
  const test = mat(
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
  )
  const expected = [
    1, 5, 9, 13,
    2, 6, 10, 14,
    3, 7, 11, 15,
    4, 8, 12, 16,
  ]

  expect(test).toEqualCloseTo(expected)
})

test('should return a 4x4 identity matrix', () => {
  const test = identity()
  const expected = mat(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  )

  expect(test).toEqualCloseTo(expected)
})

test('should return the determinant of the matrix', () => {
  const test = det(mat(
    3, 4, 0, 0,
    3, 2, 0, 0,
    0, 0, 1, 0,
    4, 5, 0, 1,
  ))
  const expected = -6

  expect(test).toBeCloseTo(expected)
})

test('should return the inverse of the matrix', () => {
  const test = inverse(mat(
    3, 4, 0, 0,
    3, 2, 0, 0,
    0, 0, 1, 0,
    4, 5, 0, 1,
  ))
  const expected = mat(
    -0.333, 0.667, 0, 0,
    0.5, -0.5, 0, 0,
    0, 0, 1, 0,
    -1.167, -0.167, 0, 1,
  )

  expect(test).toEqualCloseTo(expected)
})

test('should multiply two 4x4 matrices', () => {
  const m1 = mat(
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 2,
  )
  const m2 = mat(
    3, 0, 0, 0,
    0, 3, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 3,
  )

  const test = multiply(m1, m2)
  const expected = mat(
    6, 0, 0, 0,
    0, 6, 0, 0,
    0, 0, 6, 0,
    0, 0, 0, 6,
  )

  expect(test).toEqualCloseTo(expected)
})

test('should multiply a 4x4 matrix and a 4-vector', () => {
  const m = mat(
    2, 0, 0, 0,
    0, 2, 0, 0,
    0, 0, 2, 0,
    0, 0, 0, 2,
  )
  const v = vec(3, 3, 3, 3)

  const test = multiplyVec(m, v)
  const expected = vec(6, 6, 6, 6)

  expect(test).toEqualCloseTo(expected)
})
