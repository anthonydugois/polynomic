import { perspective } from './index'
import { mat } from '../core/matrix'

test('should return a perspective transformation matrix', () => {
  const test = perspective(100, undefined)
  const expected = mat(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, -0.01,
    0, 0, 0, 1,
  )

  expect(test).toEqualCloseTo(expected)
})
