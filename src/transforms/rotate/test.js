import { transform } from '../transform'
import { perspective } from '../perspective'

import {
  rotate3d,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
} from './index'

import parse from '../../pathstring/parse'
import isEqual from '../../path/is-equal'

test('should apply a rotate3d transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotate3d(0, 0, 1, Math.PI / 2))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a rotate transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotate(Math.PI / 2))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a rotate transform (in degrees) on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotate('90deg'))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a rotate transform with a modified origin on the path', () => {
  const path = parse('M0 0L100 0')
  const options = {
    indices: [],
    transformOrigin: { x: '50%', y: 0 },
  }

  const test = transform(rotate(Math.PI / 2))(path, options)
  const expected = 'M49.999999999999986 -50L50.000000000000014 50'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a rotateX transform on the path', () => {
  const path = parse('M0 0L100 0L100 100L0 100z')
  const options = {
    indices: [],
    transformOrigin: { x: '50%', y: '50%' },
  }

  const test = transform(
    perspective(200),
    rotateX(Math.PI / 4),
  )(path, options)
  const expected = 'M7.511055241116743 19.955779035533038L92.48894475888326 19.955779035533038L110.73686169272965 92.94744677091857L-10.736861692729647 92.94744677091857z'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a rotateY transform on the path', () => {
  const path = parse('M0 0L100 0L100 100L0 100z')
  const options = {
    indices: [],
    transformOrigin: { x: '50%', y: '50%' },
  }

  const test = transform(
    perspective(200),
    rotateY('45deg'),
  )(path, options)
  const expected = 'M7.0525532290814255 -10.736861692729647L80.04422096446696 7.511055241116743L80.04422096446696 92.48894475888326L7.0525532290814255 110.73686169272965z'

  expect(isEqual(test, expected, 20)).toBe(true)
})

test('should apply a rotateZ transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform(rotateZ(Math.PI / 2))(path)
  const expected = 'M0 0L2.220446049250313e-14 100'

  expect(isEqual(test, expected, 20)).toBe(true)
})
