import {
  linearExtremums,
  quadraticExtremums,
  cubicExtremums,
  ellipticExtremums,
} from './index'

import { arc } from '../../primitives/arc'

test('should return the extremums of the line', () => {
  const test = linearExtremums(0, 0, 100, 100)
  const expected = [
    { x: 0, y: 0 },
    { x: 100, y: 100 },
  ]

  expect(test).toEqual(expected)
})

test('should return the extremums of the quadratic curve', () => {
  const test = quadraticExtremums(0, 0, 50, 100, 100, 0)
  const expected = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 50, y: 50 },
  ]

  expect(test).toEqual(expected)
})

test('should return the extremums of the cubic curve', () => {
  const test = cubicExtremums(0, 100, 100, 200, 200, 100, 100, 0)
  const expected = [
    { x: 0, y: 100 },
    { x: 100, y: 0 },
    { x: 141.4213562373095, y: 82.84271247461899 },
    { x: 82.842712474619, y: 141.4213562373095 },
  ]

  expect(test).toEqual(expected)
})

test('should return the extremums of the arc', () => {
  const test = ellipticExtremums(arc(100, 100, 50, 100, 4.06661715715, 1, 0, 200, 50))
  const expected = [
    { x: 100, y: 100 },
    { x: 200, y: 49.99999999999999 },
    { x: 65.16877323888131, y: 164.46057332000126 },
    { x: 235.85726241535627, y: 79.98548359007526 },
    { x: 100.60283850316692, y: 194.44740048874374 },
  ]

  expect(test).toEqual(expected)
})
