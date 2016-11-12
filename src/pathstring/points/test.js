import * as points from "../../point/points"
import * as build from "./index"

test('should build a m point as string', () => {
  const test = build.m(points.m(50, 50))
  const expected = 'm 50 50'

  expect(test).toBe(expected)
})

test('should build a M point as string', () => {
  const test = build.M(points.M(50, 50))
  const expected = 'M 50 50'

  expect(test).toBe(expected)
})

test('should build a l point as string', () => {
  const test = build.l(points.l(50, 50, points.M(0, 0)))
  const expected = 'l 50 50'

  expect(test).toBe(expected)
})

test('should build a L point as string', () => {
  const test = build.L(points.L(50, 50, points.M(0, 0)))
  const expected = 'L 50 50'

  expect(test).toBe(expected)
})

test('should build a h point as string', () => {
  const test = build.h(points.h(50, points.M(0, 0)))
  const expected = 'h 50'

  expect(test).toBe(expected)
})

test('should build a H point as string', () => {
  const test = build.H(points.H(50, points.M(0, 0)))
  const expected = 'H 50'

  expect(test).toBe(expected)
})

test('should build a v point as string', () => {
  const test = build.v(points.v(50, points.M(0, 0)))
  const expected = 'v 50'

  expect(test).toBe(expected)
})

test('should build a V point as string', () => {
  const test = build.V(points.V(50, points.M(0, 0)))
  const expected = 'V 50'

  expect(test).toBe(expected)
})

test('should build a q point as string', () => {
  const test = build.q(points.q(50, 50, 100, 100, points.M(0, 0)))
  const expected = 'q 50 50 100 100'

  expect(test).toBe(expected)
})

test('should build a Q point as string', () => {
  const test = build.Q(points.Q(50, 50, 100, 100, points.M(0, 0)))
  const expected = 'Q 50 50 100 100'

  expect(test).toBe(expected)
})

test('should build a t point as string', () => {
  const test = build.t(points.t(50, 50, points.M(0, 0)))
  const expected = 't 50 50'

  expect(test).toBe(expected)
})

test('should build a T point as string', () => {
  const test = build.T(points.T(50, 50, points.M(0, 0)))
  const expected = 'T 50 50'

  expect(test).toBe(expected)
})

test('should build a c point as string', () => {
  const test = build.c(points.c(25, 25, 75, 75, 100, 100, points.M(0, 0)))
  const expected = 'c 25 25 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a C point as string', () => {
  const test = build.C(points.C(25, 25, 75, 75, 100, 100, points.M(0, 0)))
  const expected = 'C 25 25 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a s point as string', () => {
  const test = build.s(points.s(75, 75, 100, 100, points.M(0, 0)))
  const expected = 's 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a S point as string', () => {
  const test = build.S(points.S(75, 75, 100, 100, points.M(0, 0)))
  const expected = 'S 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a a point as string', () => {
  const test = build.a(points.a(50, 50, 0, 0, 0, 100, 100, points.M(0, 0)))
  const expected = 'a 50 50 0 0 0 100 100'

  expect(test).toBe(expected)
})

test('should build a A point as string', () => {
  const test = build.A(points.A(50, 50, 0, 0, 0, 100, 100, points.M(0, 0)))
  const expected = 'A 50 50 0 0 0 100 100'

  expect(test).toBe(expected)
})

test('should build a z point as string', () => {
  const test = build.z(points.z(points.M(0, 0)))
  const expected = 'z'

  expect(test).toBe(expected)
})

test('should build a Z point as string', () => {
  const test = build.Z(points.Z(points.M(0, 0)))
  const expected = 'Z'

  expect(test).toBe(expected)
})
