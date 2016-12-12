import { endpoint, center } from './index'

test('should return the object representation of an endpoint parameterization', () => {
  const test = endpoint(0, 0, 100, 50, Math.PI / 2, 1, 0, 100, 0)
  const expected = {
    x1: 0,
    y1: 0,
    rx: 100,
    ry: 50,
    phi: Math.PI / 2,
    large: 1,
    sweep: 0,
    x2: 100,
    y2: 0,
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a center parameterization', () => {
  const test = center(100, 50, 100, 50, Math.PI / 2, 0, Math.PI)
  const expected = {
    cx: 100,
    cy: 50,
    rx: 100,
    ry: 50,
    phi: Math.PI / 2,
    start: 0,
    end: Math.PI,
  }

  expect(test).toEqual(expected)
})
