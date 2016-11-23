import { m, L, Q } from '../points'
import { isM, isQ, isZ } from './index'

test('should check that the point is M', () => {
  const point = m(0, 0)()
  const test = isM(point)

  expect(test).toBe(true)
})

test('should check that the point factory is Q', () => {
  const point = Q(20, 20, 0, 0)
  const test = isQ(point)

  expect(test).toBe(true)
})

test('should check that the point is not Z', () => {
  const point = L(0, 0)()
  const test = isZ(point)

  expect(test).toBe(false)
})

test('should check that the point factory is not Z', () => {
  const point = L(0, 0)
  const test = isZ(point)

  expect(test).toBe(false)
})
