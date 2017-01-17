import { isInside } from './index'
import { point } from '../core/point'
import { parse } from '../parse'

test('should check that the point is inside the given path', () => {
  const test = isInside(
    point('', 50, 50),
    parse('M0 0L100 0L100 100L0 100'),
  )

  expect(test).toBe(true)
})

test('should check that the point is not inside the given path', () => {
  const test = isInside(
    point('', 400, 50),
    parse('M0 0L100 0L100 100L0 100'),
  )

  expect(test).toBe(false)
})
