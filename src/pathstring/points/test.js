import * as points from '../../point/points'
import * as build from './index'

test('should build a m point as string', () => {
  const point = points.m(50, 50)()

  const test = build.m(point)
  const expected = 'm 50 50'

  expect(test).toBe(expected)
})

test('should build a M point as string', () => {
  const point = points.M(50, 50)()

  const test = build.M(point)
  const expected = 'M 50 50'

  expect(test).toBe(expected)
})

test('should build a l point as string', () => {
  const point = points.l(50, 50)(points.M(0, 0)())

  const test = build.l(point)
  const expected = 'l 50 50'

  expect(test).toBe(expected)
})

test('should build a L point as string', () => {
  const point = points.L(50, 50)(points.M(0, 0)())

  const test = build.L(point)
  const expected = 'L 50 50'

  expect(test).toBe(expected)
})

test('should build a h point as string', () => {
  const point = points.h(50)(points.M(0, 0)())

  const test = build.h(point)
  const expected = 'h 50'

  expect(test).toBe(expected)
})

test('should build a H point as string', () => {
  const point = points.H(50)(points.M(0, 0)())

  const test = build.H(point)
  const expected = 'H 50'

  expect(test).toBe(expected)
})

test('should build a v point as string', () => {
  const point = points.v(50)(points.M(0, 0)())

  const test = build.v(point)
  const expected = 'v 50'

  expect(test).toBe(expected)
})

test('should build a V point as string', () => {
  const point = points.V(50)(points.M(0, 0)())

  const test = build.V(point)
  const expected = 'V 50'

  expect(test).toBe(expected)
})

test('should build a q point as string', () => {
  const point = points.q(50, 50, 100, 100)(points.M(0, 0)())

  const test = build.q(point)
  const expected = 'q 50 50 100 100'

  expect(test).toBe(expected)
})

test('should build a Q point as string', () => {
  const point = points.Q(50, 50, 100, 100)(points.M(0, 0)())

  const test = build.Q(point)
  const expected = 'Q 50 50 100 100'

  expect(test).toBe(expected)
})

test('should build a t point as string', () => {
  const point = points.t(50, 50)(points.M(0, 0)())

  const test = build.t(point)
  const expected = 't 50 50'

  expect(test).toBe(expected)
})

test('should build a T point as string', () => {
  const point = points.T(50, 50)(points.M(0, 0)())

  const test = build.T(point)
  const expected = 'T 50 50'

  expect(test).toBe(expected)
})

test('should build a c point as string', () => {
  const point = points.c(25, 25, 75, 75, 100, 100)(points.M(0, 0)())

  const test = build.c(point)
  const expected = 'c 25 25 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a C point as string', () => {
  const point = points.C(25, 25, 75, 75, 100, 100)(points.M(0, 0)())

  const test = build.C(point)
  const expected = 'C 25 25 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a s point as string', () => {
  const point = points.s(75, 75, 100, 100)(points.M(0, 0)())

  const test = build.s(point)
  const expected = 's 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a S point as string', () => {
  const point = points.S(75, 75, 100, 100)(points.M(0, 0)())

  const test = build.S(point)
  const expected = 'S 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a a point as string', () => {
  const point = points.a(50, 50, 0, 0, 0, 100, 100)(points.M(0, 0)())

  const test = build.a(point)
  const expected = 'a 50 50 0 0 0 100 100'

  expect(test).toBe(expected)
})

test('should build a A point as string', () => {
  const point = points.A(50, 50, 0, 0, 0, 100, 100)(points.M(0, 0)())

  const test = build.A(point)
  const expected = 'A 50 50 0 0 0 100 100'

  expect(test).toBe(expected)
})

test('should build a z point as string', () => {
  const point = points.z()(points.M(0, 0)())

  const test = build.z(point)
  const expected = 'z'

  expect(test).toBe(expected)
})

test('should build a Z point as string', () => {
  const point = points.Z()(points.M(0, 0)())

  const test = build.Z(point)
  const expected = 'Z'

  expect(test).toBe(expected)
})
