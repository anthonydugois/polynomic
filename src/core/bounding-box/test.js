import { boundingBox } from './index'

import { M, L, Q, C, A } from '../../points'
import { rect } from '../../rect'

test('should return the bounding box of the line', () => {
  const test = boundingBox(L(100, 100)(), M(0, 0)())
  const expected = rect(0, 0, 100, 100)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the quadratic curve', () => {
  const test = boundingBox(Q(0, 0, 150, 50)(), M(50, 150)())
  const expected = rect(37.5, 37.5, 112.5, 112.5)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the cubic curve', () => {
  const test = boundingBox(C(0, 200, 100, 200, 100, 0)(), M(0, 0)())
  const expected = rect(0, 0, 100, 150)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the arc', () => {
  const test = boundingBox(A(50, 150, 0, 1, 0, 100, 0)(), M(0, 0)())
  const expected = rect(0, 0, 100, 150)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the rotated arc', () => {
  const test = boundingBox(A(50, 100, 100, 1, 0, 150, 50)(), M(50, 50)())
  const expected = rect(22.088, 50, 197.726, 96.743)

  expect(test).toEqualCloseTo(expected)
})
