import { point } from '../index'
import { distance } from './index'

test('should give the distance between two points', () => {
  const test = distance(point('', 0, 0), point('', 0, 100))
  const expected = 100

  expect(test).toBe(expected)
})
