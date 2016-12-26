import {
  matrix3d,
  matrix,
} from './index'

import { parse } from '../parse'
import { transform } from '../transform'

test('should apply a matrix3d transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform([
    matrix3d(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      100, 100, 0, 1,
    ),
  ], path)
  const expected = 'M100 100L200 100Q250 250 300 300'

  expect(test).toEqualPath(expected)
})

test('should apply a matrix transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform([
    matrix(1, 0, 0, 1, 100, 100),
  ], path)
  const expected = 'M100 100L200 100Q250 250 300 300'

  expect(test).toEqualPath(expected)
})
