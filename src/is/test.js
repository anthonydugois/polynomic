import { M, l, L, q } from '../points'
import { isM, isQ, isZ, isRelative, isAbsolute } from './index'

test('should check that the point is M', () => {
  const test = isM(M(0, 0))
  const expected = true

  expect(test).toBe(expected)
})

test('should check that the point is not M', () => {
  const test = isM(L(0, 0))
  const expected = false

  expect(test).toBe(expected)
})

test('should check that the generated point will be Q', () => {
  const test = isQ(q(20, 20, 0, 0))
  const expected = true

  expect(test).toBe(expected)
})

test('should check that the point is not Z', () => {
  const test = isZ(L(0, 0))
  const expected = false

  expect(test).toBe(expected)
})

test('should check that the generated point will be relative', () => {
  const test = isRelative(l(0, 0))
  const expected = true

  expect(test).toBe(expected)
})

test('should check that the point is absolute', () => {
  const test = isAbsolute(M(0, 0))
  const expected = true

  expect(test).toBe(expected)
})
