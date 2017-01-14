import { M, L, H, V, Q, T, C, A } from '../../points'
import { toC } from './index'

test('should convert the line into a cubic curve', () => {
  const test = toC(M(0, 0), L(100, 0))
  const expected = C(0, 0, 100, 0, 100, 0)

  expect(test).toEqualCloseTo(expected)
})

test('should convert the horizontal line into a cubic curve', () => {
  const test = toC(M(0, 0), H(100, M(0, 0)))
  const expected = C(0, 0, 100, 0, 100, 0)

  expect(test).toEqualCloseTo(expected)
})

test('should convert the vertical line into a cubic curve', () => {
  const test = toC(M(0, 0), V(100, M(0, 0)))
  const expected = C(0, 0, 0, 100, 0, 100)

  expect(test).toEqualCloseTo(expected)
})

test('should convert the quadratic curve into a cubic curve', () => {
  const test = toC(M(0, 0), Q(75, 25, 100, 100))
  const expected = C(50, 16.667, 83.333, 50, 100, 100)

  expect(test).toEqualCloseTo(expected)
})

test('should convert the computed quadratic curve into a cubic curve', () => {
  const test = toC(Q(0, 100, 100, 100), T(200, 0, Q(0, 100, 100, 100)))
  const expected = C(166.667, 100, 200, 66.667, 200, 0)

  expect(test).toEqualCloseTo(expected)
})

test('should convert the arc into a cubic curve', () => {
  const test = toC(M(0, 0), A(50, 50, 0, 0, 1, 0, 100))
  const expected = [
    C(38.49, 0, 62.546, 41.667, 43.301, 75),
    C(34.37, 90.470, 17.863, 100, 0, 100),
  ]

  expect(test).toEqualCloseTo(expected)
})

test('should return the exact same point if it is already a cubic curve', () => {
  const test = toC(M(0, 0), C(25, 25, 25, 75, 0, 100))
  const expected = C(25, 25, 25, 75, 0, 100)

  expect(test).toEqualCloseTo(expected)
})
