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

import { mat } from '../matrix'
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

test('should convert a center parameterization into a matrix', () => {
  const center = endpointToCenter(0, 0, 50, 100, 3 * Math.PI / 4, 1, 0, 100, 0)

  const test = centerToMatrix(center.cx, center.cy, 50, 100, 3 * Math.PI / 4)
  const expected = mat(
    50 * Math.cos(3 * Math.PI / 4), 50 * Math.sin(3 * Math.PI / 4), 0, 0,
    -100 * Math.sin(3 * Math.PI / 4), 100 * Math.cos(3 * Math.PI / 4), 0, 0,
    0, 0, 1, 0,
    center.cx, center.cy, 0, 1,
  )

  expect(test).toEqual(expected)
})

test('should convert a matrix into an implicit ellipse equation', () => {
  const center = endpointToCenter(0, 0, 50, 100, 3 * Math.PI / 4, 1, 0, 100, 0)

  const test = matrixToImplicit(mat(
    50 * Math.cos(3 * Math.PI / 4), 50 * Math.sin(3 * Math.PI / 4), 0, 0,
    -100 * Math.sin(3 * Math.PI / 4), 100 * Math.cos(3 * Math.PI / 4), 0, 0,
    0, 0, 1, 0,
    center.cx, center.cy, 0, 1,
  ))
  const expected = [
    0.00025,
    -0.0003000000000000001,
    0.0002500000000000001,
    -0.02500000000000001,
    -0.0004919333848296664,
    4.440892098500626e-16,
  ]

  expect(test).toEqual(expected)
})

test('should convert an implicit parameterization into an ellipse parameterization', () => {
  const center = endpointToCenter(0, 0, 100, 50, Math.PI / 4, 1, 0, 100, 0)
  const matrix = centerToMatrix(center.cx, center.cy, 100, 50, Math.PI / 4)
  const implicit = matrixToImplicit(matrix)
  const ellipse = implicitToEllipse(...implicit)

  console.log(center)
  console.log(matrix)
  console.log(implicit)
  console.log(ellipse)

  // rx = 60.5
  // ry = 164.9
  // theta = 160.7
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
