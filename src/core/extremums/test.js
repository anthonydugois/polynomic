import {
  linearExtremums,
  quadraticExtremums,
  cubicExtremums,
  ellipticExtremums,
} from './index'

import { arc } from '../../arc'

test('should return the extremums of the line', () => {
  const test = linearExtremums(0, 0, 100, 100)
  const expected = [
    { x: 0, y: 0 },
    { x: 100, y: 100 },
  ]

  expect(test).toEqualCloseTo(expected)
})

test('should return the extremums of the quadratic curve', () => {
  const test = quadraticExtremums(0, 0, 50, 100, 100, 0)
  const expected = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 50, y: 50 },
  ]

  expect(test).toEqualCloseTo(expected)
})

test('should return the extremums of the cubic curve', () => {
  const test = cubicExtremums(0, 100, 100, 200, 200, 100, 100, 0)
  const expected = [
    { x: 0, y: 100 },
    { x: 100, y: 0 },
    { x: 141.421, y: 82.843 },
    { x: 82.843, y: 141.421 },
  ]

  expect(test).toEqualCloseTo(expected)
})

test('should return the extremums of the arc', () => {
  const test = ellipticExtremums(arc(100, 100, 50, 100, 233 * Math.PI / 180, 1, 0, 200, 50))
  const expected = [
    { x: 100, y: 100 },
    { x: 200, y: 50 },
    { x: 65.169, y: 164.461 },
    { x: 235.857, y: 79.985 },
    { x: 100.603, y: 194.447 },
  ]

  expect(test).toEqualCloseTo(expected)
})
