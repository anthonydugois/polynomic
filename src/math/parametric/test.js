import {
  linear,
  quadratic,
  cubic,
  arc,
} from './index'

import { endpointParameterization } from '../../primitives/endpoint-parameterization'

test('should return the point located at the provided offset on the line', () => {
  const test = linear(0, 0, 100, 0)(0.5)
  const expected = { x: 50, y: 0 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the quadratic curve', () => {
  const test = quadratic(0, 0, 50, 50, 100, 0)(0.5)
  const expected = { x: 50, y: 25 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the cubic curve', () => {
  const test = cubic(0, 0, 0, 50, 100, 50, 100, 0)(0.5)
  const expected = { x: 50, y: 37.5 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the arc', () => {
  const test = arc(endpointParameterization(0, 0, 100, 50, 0, 1, 0, 200, 0))(0.5)
  const expected = { x: 100, y: 50 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the inversed arc', () => {
  const test = arc(endpointParameterization(100, 0, 50, 150, 0, 1, 1, 100, 300))(0.5)
  const expected = { x: 150, y: 150 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the line', () => {
  const test = arc(endpointParameterization(0, 0, 0, 0, 0, 1, 1, 300, 300))(0.5)
  const expected = { x: 150, y: 150 }

  expect(test).toEqual(expected)
})

test('should return the point located at the provided offset on the rotated arc', () => {
  const test = arc(endpointParameterization(100, 0, 50, 150, Math.PI / 2, 1, 1, 100, 300))(0.5)
  const expected = { x: 550, y: 149.99999999999994 }

  expect(test).toEqual(expected)
})
