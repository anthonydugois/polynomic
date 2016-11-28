import { center, angles } from './index'
import { M, A } from '../../point'

test('should find the center of the ellipse', () => {
  const test = center(150, 0, 150, 100, 0, 1, 0, 300, 100)
  const expected = { x: 150, y: 100 }

  expect(test).toEqual(expected)
})

test('should find the center of the sweeped ellipse', () => {
  const test = center(150, 0, 150, 100, 0, 1, 1, 300, 100)
  const expected = { x: 300, y: 0 }

  expect(test).toEqual(expected)
})

test('should find the center of the linear ellipse', () => {
  const test = center(0, 0, 0, 0, 0, 1, 0, 300, 0)
  const expected = { x: 150, y: 0 }

  expect(test).toEqual(expected)
})

test('should find the center of the rotated ellipse', () => {
  const test = center(100, 0, 100, 150, Math.PI / 2, 1, 0, 200, 150)
  const expected = { x: 71.69029566002413, y: 98.20287535999285 }

  expect(test).toEqual(expected)
})

test('should find the angles of the points on the ellipse', () => {
  const test = angles(150, 0, 150, 100, 0, 1, 0, 300, 100)
  const expected = { start: -Math.PI / 2, delta: -3 / 2 * Math.PI }

  expect(test).toEqual(expected)
})

test('should find the angles of the points on the sweeped ellipse', () => {
  const test = angles(150, 0, 150, 100, 0, 1, 1, 300, 100)
  const expected = { start: Math.PI, delta: 3 / 2 * Math.PI }

  expect(test).toEqual(expected)
})
