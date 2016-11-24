import { transform } from '../index'

import {
  scale3d,
  scale,
  scaleX,
  scaleY,
  scaleZ,
} from './index'

import { parse } from '../../pathstring/parse'
import { isEqual } from '../../path/is-equal'

test('should apply a scale3d transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform(scale3d(2, 2, 0))(path)
  const expected = 'M0 0L200 0Q300 300 400 400'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a scale transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform(scale(2, 2))(path)
  const expected = 'M0 0L200 0Q300 300 400 400'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a scaleX transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform(scaleX(.5))(path)
  const expected = 'M0 0L50 0Q75 150 100 200'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a scaleY transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform(scaleY(.5))(path)
  const expected = 'M0 0L100 0Q150 75 200 100'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a scaleZ transform on the path', () => {
  const path = parse('M0 0L100 0Q150 150 200 200')

  const test = transform(scaleZ(1))(path)
  const expected = 'M0 0L100 0Q150 150 200 200'

  expect(isEqual(test, expected)).toBe(true)
})
