import { point } from '../points'
import distanceSegment from './index'

test('should give the distance between a point and a segment', () => {
  const test = distanceSegment(point('', 100, 50), point('', 0, 0), point('', 0, 100))
  const expected = 100

  expect(test).toBe(expected)
})
