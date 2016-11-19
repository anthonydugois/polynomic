import { transform } from "../transform"

import {
  skew,
  skewX,
  skewY,
} from "./index"

import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should apply a skew transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')
  const a = Math.PI / 6

  const test = transform(skew(a, a))(path)
  const expected = 'M0 0L100 57.735026918962575L157.73502691896257 157.73502691896257'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a skewX transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')
  const a = Math.PI / 6

  const test = transform(skewX(a))(path)
  const expected = 'M0 0L100 0L157.73502691896257 100'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a skewY transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')
  const a = Math.PI / 6

  const test = transform(skewY(Math.PI / 6))(path)
  const expected = 'M0 0L100 57.735026918962575L100 157.73502691896257'

  expect(isEqual(test, expected, 20)).toBe(true)
})
