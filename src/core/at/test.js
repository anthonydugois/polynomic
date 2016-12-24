import { M, L, Q, C, A } from '../../points'
import { pointAt } from './index'

test('should return the point at the provided offset on the line', () => {
  const test = pointAt(M(0, 0)(), L(300, 300)())(0.5)
  const expected = { x: 150, y: 150 }

  expect(test).toEqual(expected)
})

test('should return the point at the provided offset on the quadratic curve', () => {
  const test = pointAt(M(0, 0)(), Q(50, 50, 100, 0)())(0.5)
  const expected = { x: 50, y: 25 }

  expect(test).toEqual(expected)
})

test('should return the point at the provided offset on the cubic curve', () => {
  const test = pointAt(M(0, 0)(), C(0, 50, 100, 50, 100, 0)())(0.5)
  const expected = { x: 50, y: 37.5 }

  expect(test).toEqual(expected)
})

test('should return the point at the provided offset on the arc', () => {
  const test = pointAt(M(100, 0)(), A(50, 150, 90, 1, 1, 100, 300)())(0.5)
  const expected = { x: 550, y: 149.99999999999994 }

  expect(test).toEqual(expected)
})
