import { point } from '../index'
import { distanceToPoint } from './index'

test('should give the distance between two points', () => {
  const test = distanceToPoint(point('', 0, 0), point('', 0, 100))
  const expected = 100

  expect(test).toBe(expected)
})
