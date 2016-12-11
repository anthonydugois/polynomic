import { centerParameterization } from './index'

test('should return the object representation of a center parameterization', () => {
  const test = centerParameterization(100, 50, 100, 50, Math.PI / 2, 0, Math.PI)
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
