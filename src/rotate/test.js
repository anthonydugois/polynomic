import {
  rotate3d,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
} from './index'

import { parse } from '../parse'
import { transform } from '../transform'
import { perspective } from '../perspective'

test('should apply a rotate3d transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform([
    rotate3d(0, 0, 1, Math.PI / 2),
  ], path)
  const expected = 'M0 0L0 100'

  expect(test).toEqualPath(expected)
})

test('should apply a rotate transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform([
    rotate(Math.PI / 2),
  ], path)
  const expected = 'M0 0L0 100'

  expect(test).toEqualPath(expected)
})

test('should apply a rotate transform (in degrees) on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform([
    rotate('90deg'),
  ], path)
  const expected = 'M0 0L0 100'

  expect(test).toEqualPath(expected)
})

test('should apply a rotate transform with a modified origin on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform([
    rotate(Math.PI / 2),
  ], path, {
    transformOrigin: {
      x: '50%',
      y: 0,
    },
  })
  const expected = 'M50 -50L50 50'

  expect(test).toEqualPath(expected)
})

test('should apply a rotateX transform on the path', () => {
  const path = parse('M0 0L100 0L100 100L0 100z')

  const test = transform([
    perspective(200),
    rotateX(Math.PI / 4),
  ], path, {
    transformOrigin: {
      x: '50%',
      y: '50%',
    },
  })
  const expected = 'M7.511 19.956L92.489 19.956L110.737 92.947L-10.737 92.947z'

  expect(test).toEqualPath(expected)
})

test('should apply a rotateY transform on the path', () => {
  const path = parse('M0 0L100 0L100 100L0 100z')

  const test = transform([
    perspective(200),
    rotateY('45deg'),
  ], path, {
    transformOrigin: {
      x: '50%',
      y: '50%',
    },
  })
  const expected = 'M7.053 -10.737L80.044 7.511L80.044 92.489L7.053 110.737z'

  expect(test).toEqualPath(expected)
})

test('should apply a rotateZ transform on the path', () => {
  const path = parse('M0 0L100 0')

  const test = transform([
    rotateZ(Math.PI / 2),
  ], path)
  const expected = 'M0 0L0 100'

  expect(test).toEqualPath(expected)
})
