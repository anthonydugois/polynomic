import { transform } from '../index'
import { perspective } from './index'

test('should return a perspective transformation matrix', () => {
  const test = perspective(100)
  const expected = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, -1 / 100, 1,
  ]

  expect(test).toEqual(expected)
})
