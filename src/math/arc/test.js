import {
  centerToEndpoint,
  endpointToCenter,
  transformArc,
  foci,
} from './index'

import { endpoint, center } from '../../primitives/arc'
import { scale } from '../../transforms/scale'

test('should transform an endpoint parameterization', () => {
  const test = transformArc(
    endpoint(0, 0, 100, 50, Math.PI / 4, 1, 0, 100, 0),
    scale(2, 1)(),
  )

  console.log(test)
})

test('should convert a center parameterization into a endpoint parameterization', () => {
  const test = centerToEndpoint(center(150, 125, 50, 100, Math.PI / 4, 2.9764439761751667, -0.16514867741462674))
  const expected = endpoint(103.50094450247231, 101.75047225123612, 50, 100, Math.PI / 4, 1, 0, 196.4990554975277, 148.24952774876385)

  expect(test).toEqual(expected)
})

test('should convert a endpoint parameterization into a center parameterization', () => {
  const test = endpointToCenter(endpoint(100, 100, 50, 100, Math.PI / 4, 1, 0, 200, 150))
  const expected = center(150, 125.00000000000001, 50, 100, Math.PI / 4, 2.9764439761751667, -0.16514867741462674)

  expect(test).toEqual(expected)
})
