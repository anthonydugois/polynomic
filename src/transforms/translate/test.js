import { transform } from "../transform"

import {
  translate3d,
  translate,
  translateX,
  translateY,
  translateZ,
} from "./index"

import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should apply a translate3d transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translate3d(100, 100, 0))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a relative translate3d transform on the path', () => {
  const path = parse('M0 0L100 0L100 100')

  const test = transform(translate3d('50%', '50%', 0))(path)
  const expected = 'M50 50L150 50L150 150'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a translate transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translate(100, 100))(path)
  const expected = 'M100 100L200 200Q250 250 300 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a translateX transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translateX(100))(path)
  const expected = 'M100 0L200 100Q250 150 300 200'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a translateY transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translateY(100))(path)
  const expected = 'M0 100L100 200Q150 250 200 300'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a translateZ transform on the path', () => {
  const path = parse('M0 0L100 100Q150 150 200 200')

  const test = transform(translateZ(0))(path)
  const expected = 'M0 0L100 100Q150 150 200 200'

  expect(isEqual(test, expected)).toBe(true)
})
