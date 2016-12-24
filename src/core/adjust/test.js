import { correct } from './index'

import * as points from '../../points'

test('should convert the first point into a M point', () => {
  const test = correct(points.L(50, 50)(), undefined, 0)
  const expected = points.M(50, 50)()

  expect(test).toEqual(expected)
})

test('should convert the point into a M point', () => {
  const test = correct(points.L(50, 50)(), points.Z()(), 1)
  const expected = points.M(50, 50)()

  expect(test).toEqual(expected)
})

test('should not convert the point into a M point', () => {
  const test = correct(points.M(50, 50)(), points.Z()(), 1)
  const expected = points.M(50, 50)()

  expect(test).toEqual(expected)
})

test('should convert the H point into a L point', () => {
  const test = correct(
    points.H(50)(points.M(25, 25)()),
    points.M(0, 0)(),
    1,
  )
  const expected = points.L(50, 25)()

  expect(test).toEqual(expected)
})

test('should convert the V point into a L point', () => {
  const test = correct(
    points.V(50)(points.M(25, 25)()),
    points.M(0, 0)(),
    1,
  )
  const expected = points.L(25, 50)()

  expect(test).toEqual(expected)
})

test('should convert the T point into a Q point', () => {
  const test = correct(
    points.T(100, 100)(points.Q(25, 25, 50, 50)()),
    points.M(0, 0)(),
    1,
  )
  const expected = points.Q(75, 75, 100, 100)()

  expect(test).toEqual(expected)
})

test('should convert the T point into a Q point', () => {
  const test = correct(
    points.T(100, 100)(points.Q(25, 25, 50, 50)()),
    points.Q(25, 25, 75, 75)(),
    1,
  )
  const expected = points.Q(75, 75, 100, 100)()

  expect(test).toEqual(expected)
})

test('should convert the S point into a C point', () => {
  const test = correct(
    points.S(125, 125, 150, 150)(points.C(25, 25, 50, 50, 75, 75)()),
    points.M(0, 0)(),
    1,
  )
  const expected = points.C(100, 100, 125, 125, 150, 150)()

  expect(test).toEqual(expected)
})

test('should convert the S point into a C point', () => {
  const test = correct(
    points.S(125, 125, 150, 150)(points.C(25, 25, 50, 50, 75, 75)()),
    points.C(50, 50, 60, 60, 70, 70)(),
    1,
  )
  const expected = points.C(100, 100, 125, 125, 150, 150)()

  expect(test).toEqual(expected)
})
