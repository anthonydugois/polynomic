import {
  distance,
  distanceToPoint,
  distanceToLine,
} from './index'

import { point } from '../point'
import { line } from '../../line'

test('should give the distance between a set of coords', () => {
  const test = distance(0, 0, 0, 100)
  const expected = 100

  expect(test).toBeCloseTo(expected)
})

test('should give the distance between two points', () => {
  const test = distanceToPoint(
    point('', 0, 0),
    point('', 0, 100),
  )
  const expected = 100

  expect(test).toBeCloseTo(expected)
})

test('should give the distance between a point and a line', () => {
  const test = distanceToLine(
    point('', 100, 50),
    line(0, 0, 0, 100),
  )
  const expected = 100

  expect(test).toBeCloseTo(expected)
})
