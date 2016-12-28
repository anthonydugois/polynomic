import { M, l, L, Q } from '../points'
import { isM, isQ, isZ, isRelative, isAbsolute } from './index'

test('should check that the point is M', () => {
  const test = isM(M(0, 0))
  const expected = true

  expect(test).toBe(expected)
})

test('should check that the point is Q', () => {
  const test = isQ(Q(20, 20, 0, 0))
  const expected = true

  expect(test).toBe(expected)
})

test('should check that the point is not Z', () => {
  const test = isZ(L(0, 0))
  const expected = false

  expect(test).toBe(expected)
})

test('should check that the point is relative', () => {
  const test = isRelative(l(0, 0, M(0, 0)))
  const expected = true

  expect(test).toBe(expected)
})

test('should check that the point is absolute', () => {
  const test = isAbsolute(M(0, 0))
  const expected = true

  expect(test).toBe(expected)
})
