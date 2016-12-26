import * as points from '../points'
import * as str from './index'

test('should build a m point as string', () => {
  const previous = points.M(0, 0)
  const current = points.m(50, 50, previous)

  const test = str.m(current, previous)
  const expected = 'm 50 50'

  expect(test).toBe(expected)
})

test('should build a M point as string', () => {
  const current = points.M(50, 50)

  const test = str.M(current)
  const expected = 'M 50 50'

  expect(test).toBe(expected)
})

test('should build a l point as string', () => {
  const previous = points.M(0, 0)
  const current = points.l(50, 50, previous)

  const test = str.l(current, previous)
  const expected = 'l 50 50'

  expect(test).toBe(expected)
})

test('should build a L point as string', () => {
  const current = points.L(50, 50)

  const test = str.L(current)
  const expected = 'L 50 50'

  expect(test).toBe(expected)
})

test('should build a h point as string', () => {
  const previous = points.M(0, 50)
  const current = points.h(50, previous)

  const test = str.h(current, previous)
  const expected = 'h 50'

  expect(test).toBe(expected)
})

test('should build a H point as string', () => {
  const current = points.H(50, points.M(0, 50))

  const test = str.H(current)
  const expected = 'H 50'

  expect(test).toBe(expected)
})

test('should build a v point as string', () => {
  const previous = points.M(50, 0)
  const current = points.v(50, previous)

  const test = str.v(current, previous)
  const expected = 'v 50'

  expect(test).toBe(expected)
})

test('should build a V point as string', () => {
  const current = points.V(50, points.M(50, 0))

  const test = str.V(current)
  const expected = 'V 50'

  expect(test).toBe(expected)
})

test('should build a q point as string', () => {
  const previous = points.M(0, 0)
  const current = points.q(50, 50, 100, 100, previous)

  const test = str.q(current, previous)
  const expected = 'q 50 50 100 100'

  expect(test).toBe(expected)
})

test('should build a Q point as string', () => {
  const current = points.Q(50, 50, 100, 100)

  const test = str.Q(current)
  const expected = 'Q 50 50 100 100'

  expect(test).toBe(expected)
})

test('should build a t point as string', () => {
  const previous = points.Q(50, 50, 100, 100)
  const current = points.t(100, 100, previous)

  const test = str.t(current, previous)
  const expected = 't 100 100'

  expect(test).toBe(expected)
})

test('should build a T point as string', () => {
  const current = points.T(200, 200, points.Q(50, 50, 100, 100))

  const test = str.T(current)
  const expected = 'T 200 200'

  expect(test).toBe(expected)
})

test('should build a c point as string', () => {
  const previous = points.M(0, 0)
  const current = points.c(25, 25, 75, 75, 100, 100, previous)

  const test = str.c(current, previous)
  const expected = 'c 25 25 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a C point as string', () => {
  const current = points.C(25, 25, 75, 75, 100, 100)

  const test = str.C(current)
  const expected = 'C 25 25 75 75 100 100'

  expect(test).toBe(expected)
})

test('should build a s point as string', () => {
  const previous = points.C(50, 50, 100, 100, 150, 150)
  const current = points.s(100, 100, 150, 150, previous)

  const test = str.s(current, previous)
  const expected = 's 100 100 150 150'

  expect(test).toBe(expected)
})

test('should build a S point as string', () => {
  const current = points.S(250, 250, 300, 300, points.C(50, 50, 100, 100, 150, 150))

  const test = str.S(current)
  const expected = 'S 250 250 300 300'

  expect(test).toBe(expected)
})

test('should build a a point as string', () => {
  const previous = points.M(0, 0)
  const current = points.a(50, 50, 0, 1, 0, 100, 100, previous)

  const test = str.a(current, previous)
  const expected = 'a 50 50 0 1 0 100 100'

  expect(test).toBe(expected)
})

test('should build a A point as string', () => {
  const current = points.A(50, 50, 0, 1, 0, 100, 100)

  const test = str.A(current)
  const expected = 'A 50 50 0 1 0 100 100'

  expect(test).toBe(expected)
})

test('should build a z point as string', () => {
  const current = points.z(points.M(0, 0))

  const test = str.z(current)
  const expected = 'z'

  expect(test).toBe(expected)
})

test('should build a Z point as string', () => {
  const current = points.Z(points.M(0, 0))

  const test = str.Z(current)
  const expected = 'Z'

  expect(test).toBe(expected)
})
