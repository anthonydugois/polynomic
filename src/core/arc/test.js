import {
  ellipseToArc,
  arcToEllipse,
  transformArcParameters,
  foci,
} from './index'

import { arc } from '../../arc'
import { ellipse } from '../../ellipse'
import { scale } from '../../scale'
import { translate } from '../../translate'

test('should transform radii and rotation of an arc', () => {
  const test = transformArcParameters(
    arc(0, 0, 100, 50, Math.PI / 4, 1, 0, 100, 0),
    translate(100, 100)(),
  )
})

test('should convert a center parameterization into a arc parameterization', () => {
  const test = ellipseToArc(ellipse(150, 125, 50, 100, Math.PI / 4, 2.9764439761751667, -0.16514867741462674))
  const expected = arc(103.50094450247231, 101.75047225123612, 50, 100, Math.PI / 4, 1, 0, 196.4990554975277, 148.24952774876385)

  expect(test).toEqual(expected)
})

test('should convert a arc parameterization into a center parameterization', () => {
  const test = arcToEllipse(arc(100, 100, 50, 100, Math.PI / 4, 1, 0, 200, 150))
  const expected = ellipse(150, 125.00000000000001, 50, 100, Math.PI / 4, 2.9764439761751667, -0.16514867741462674)

  expect(test).toEqual(expected)
})
