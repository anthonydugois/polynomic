import { M, Q, C } from '../points'
import { quadraticToCubic } from './index'

test('should convert the quadratic curve into a cubic curve', () => {
  const previous = M(0, 0)()
  const point = Q(75, 25, 100, 100)()
  const test = quadraticToCubic(previous, point)
  const expected = C(50, 16.666666666666664, 83.33333333333333, 49.99999999999999, 100, 100)()

  expect(test).toEqual(expected)
})
