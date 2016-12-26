import {
  skew,
  skewX,
  skewY,
} from './index'

import { parse } from '../parse'
import { transform } from '../transform'

test('should apply a skew transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')

  const test = transform([
    skew(Math.PI / 6, Math.PI / 6),
  ], path)
  const expected = 'M0 0L100 57.735L157.735 157.735'

  expect(test).toEqualPath(expected)
})

test('should apply a skewX transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')

  const test = transform([
    skewX(Math.PI / 6),
  ], path)
  const expected = 'M0 0L100 0L157.735 100'

  expect(test).toEqualPath(expected)
})

test('should apply a skewY transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')

  const test = transform([
    skewY(Math.PI / 6),
  ], path)
  const expected = 'M0 0L100 57.735L100 157.735'

  expect(test).toEqualPath(expected)
})
