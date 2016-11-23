import { point } from '../points'
import { squareDistance } from './index'

test('should give the square distance between two points', () => {
  const test = squareDistance(
    point('', 0, 0),
    point('', 100, 0),
  )
  const expected = 10000

  expect(test).toBe(expected)
})
