import { transform } from "../transform"

import {
  rotate3d,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
} from "./index"

import parse from "../../pathstring/parse"
import isEqual from "../../path/is-equal"

test('should apply a rotate3d transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotate3d(0, 0, 1, Math.PI / 2))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a rotate transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotate(Math.PI / 2))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a rotate transform (in degrees) on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotate('90deg'))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a rotate transform with a modified origin on the path', () => {
  const path = parse('M0 0L100 0')
  const origin = { x: '50%', y: 0 }

  const test = transform(rotate(Math.PI / 2))(path, [], origin)
  const expected = 'M49.999999999999986 -50L50.000000000000014 50'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a rotateX transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotateX(0))(path)
  const expected = 'M0 0L100 0'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a rotateY transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotateY(0))(path)
  const expected = 'M0 0L100 0'

  expect(isEqual(test, expected)).toBe(true)
})

test('should apply a rotateZ transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotateZ(Math.PI / 2))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected)).toBe(true)
})
