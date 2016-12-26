import { boundingBox } from './index'

import { parse } from '../parse'
import { rect } from '../rect'

test('should return the bounding box of the line', () => {
  const test = boundingBox(parse('M0 0L100 100'))
  const expected = rect(0, 0, 100, 100)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the quadratic curve', () => {
  const test = boundingBox(parse('M50 150 Q0 0 150 50'))
  const expected = rect(37.5, 37.5, 112.5, 112.5)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the cubic curve', () => {
  const test = boundingBox(parse('M0 0C0 200 100 200 100 0'))
  const expected = rect(0, 0, 100, 150)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the arc', () => {
  const test = boundingBox(parse('M0 0A50 150 0 1 0 100 0'))
  const expected = rect(0, 0, 100, 150)

  expect(test).toEqualCloseTo(expected)
})

test('should return the bounding box of the rotated arc', () => {
  const test = boundingBox(parse('M50 50A50 100 100 1 0 150 50'))
  const expected = rect(22.088, 50, 197.726, 96.743)

  expect(test).toEqualCloseTo(expected)
})

test('should give the bounding box of the path', () => {
  const path = parse('M 100 100 V 0 Q 200 0 200 50 T 300 100 C 450 100 500 100 400 200 S 350 299 250 250 H 100 A 50 100 30 0 1 50 150 z')

  const test = boundingBox(path)
  const expected = rect(20.215, 0, 431.81, 282.417)

  expect(test).toEqualCloseTo(expected)
})
