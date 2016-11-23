import parse from '../../pathstring/parse'
import { point } from '../points'
import isInside from './index'

test('should check that the point is inside the given path', () => {
  const path = parse('M0 0L100 0L100 100L0 100')
  const test = isInside(point('', 50, 50), path)

  expect(test).toBe(true)
})

test('should check that the point is not inside the given path', () => {
  const path = parse('M0 0L100 0L100 100L0 100')
  const test = isInside(point('', 400, 50), path)

  expect(test).toBe(false)
})
