import { point } from '../point'
import { distanceToPoint, distanceToLine } from './index'

test('should give the distance between two points', () => {
  const test = distanceToPoint(point('', 0, 0), point('', 0, 100))
  const expected = 100

  expect(test).toBe(expected)
})

test('should give the distance between a point and a segment', () => {
  const test = distanceToLine(
    point('', 100, 50),
    point('', 0, 0),
    point('', 0, 100),
  )
  const expected = 100

  expect(test).toBe(expected)
})
