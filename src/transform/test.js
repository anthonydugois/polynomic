import { transform } from './index'

import { translate } from '../translate'
import { scale } from '../scale'
import { parse } from '../parse'

test('should transform the line', () => {})

test('should transform the quadratic curve', () => {})

test('should transform the cubic curve', () => {})

test('should transform the arc', () => {})

test('should apply the transform list on the path', () => {
  const path = parse('M0 0L100 100Q200 125 200 200')

  const test = transform(
    translate(100, 100),
    scale(1.5, 2),
  )(path)
  const expected = 'M100 100L250 300Q400 350 400 500'

  expect(test).toEqualPath(expected)
})

test('should apply the transform on the arc', () => {
  const path = parse('M50 0A100 50 45 1 0 150 0')

  const test = transform(
    translate(100, 100),
    scale(1.5, 2),
  )(path)
  const expected = 'M175 100A83.8 178.997 327.962 1 0 325 100'

  expect(test).toEqualPath(expected)
})

test('should apply the transform on the arc with a different origin', () => {
  const path = parse('M50 0A100 50 45 1 0 150 0')

  const test = transform(
    translate(100, 100),
    scale(1.5, 2),
  )(path, { transformOrigin: { x: 'center', y: 'center' }})
  const expected = 'M110.476 36.265A83.8 178.997 327.962 1 0 260.476 36.265'

  expect(test).toEqualPath(expected)
})
