import { endpointParameterization } from './index'

test('should return the object representation of an endpoint parameterization', () => {
  const test = endpointParameterization(0, 0, 100, 50, Math.PI / 2, 1, 0, 100, 0)
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
