import {
  makeMod,
  flag,
  centerToEndpoint,
  endpointToCenter,
  transformArc,
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

test('should transform an endpoint parameterization', () => {
  const test = transformArc({
    x1: 0,
    y1: 0,
    rx: 100,
    ry: 50,
    phi: Math.PI / 4,
    large: 1,
    sweep: 0,
    x2: 100,
    y2: 0,
  })(scale(2, 1)())

  console.log(test)
})

test('should convert a center parameterization into a endpoint parameterization', () => {
  const test = centerToEndpoint({
    cx: 150,
    cy: 125,
    rx: 50,
    ry: 100,
    phi: Math.PI / 4,
    start: 2.9764439761751667,
    end: -0.16514867741462674,
  })
  const expected = {
    x1: 103.50094450247231,
    y1: 101.75047225123612,
    rx: 50,
    ry: 100,
    phi: Math.PI / 4,
    large: 1,
    sweep: 0,
    x2: 196.4990554975277,
    y2: 148.24952774876385,
  }

  expect(test).toEqual(expected)
})

test('should convert a endpoint parameterization into a center parameterization', () => {
  const test = endpointToCenter({
    x1: 100,
    y1: 100,
    rx: 50,
    ry: 100,
    phi: Math.PI / 4,
    large: 1,
    sweep: 0,
    x2: 200,
    y2: 150,
  })
  const expected = {
    cx: 150,
    cy: 125.00000000000001,
    rx: 50,
    ry: 100,
    phi: Math.PI / 4,
    start: 2.9764439761751667,
    end: -0.16514867741462674,
  }

  expect(test).toEqual(expected)
})
