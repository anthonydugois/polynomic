import { perspective } from './index'
import { mat } from '../core/matrix'

test('should return a perspective transformation matrix', () => {
  const test = perspective(100)()
  const expected = mat(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, -1 / 100,
    0, 0, 0, 1,
  )

  expect(test).toEqual(expected)
})
