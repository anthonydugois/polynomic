import {
  makeMod,
  flag,
  centerToEndpoint,
  endpointToCenter,
  centerToMatrix,
  matrixToImplicit,
  implicitToEllipse,
  foci,
} from './index'

import { scale } from '../../transforms/scale'

test('should make a function that returns the mod of a number', () => {
  const test = typeof makeMod(3)
  const expected = 'function'

  expect(test).toBe(expected)
})

test('should return the mod of a given number', () => {
  const test = makeMod(3)(5)
  const expected = 2

  expect(test).toBe(expected)
})

test('should normalize a number to have the flag 0', () => {
  const test = flag(0)
  const expected = 0

  expect(test).toBe(expected)
})

test('should normalize a number to have the flag 1', () => {
  const test = flag(8)
  const expected = 1

  expect(test).toBe(expected)
})

test('should convert an implicit parameterization into an ellipse parameterization', () => {
  const center = endpointToCenter(0, 0, 50, 100, 3 * Math.PI / 4, 1, 0, 100, 0)
  const matrix = centerToMatrix(center.cx, center.cy, 50, 100, 3 * Math.PI / 4)
  const implicit = matrixToImplicit(scale(1.5, 2)(matrix))
  const ellipse = implicitToEllipse(...implicit)

  console.log(center)
  console.log(matrix)
  console.log(implicit)
  console.log(ellipse)
})

test('should convert a center parameterization into a endpoint parameterization', () => {
  const test = centerToEndpoint(150, 125, 50, 100, Math.PI / 4, 2.9764439761751667, -0.16514867741462674)
  const expected = {
    x1: 103.50094450247231,
    y1: 101.75047225123612,
    x2: 196.4990554975277,
    y2: 148.24952774876385,
    large: 1,
    sweep: 0,
  }

  expect(test).toEqual(expected)
})

test('should convert a endpoint parameterization into a center parameterization', () => {
  const test = endpointToCenter(100, 100, 50, 100, Math.PI / 4, 1, 0, 200, 150)
  const expected = {
    cx: 150,
    cy: 125.00000000000001,
    start: 2.9764439761751667,
    end: -0.16514867741462674,
  }

  expect(test).toEqual(expected)
})
