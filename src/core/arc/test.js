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

test('should convert a center parameterization into an arc parameterization', () => {
  const test = ellipseToArc(ellipse(150, 125, 50, 100, Math.PI / 4, 2.9764439761751667, -0.16514867741462674))
  const expected = arc(103.501, 101.75, 50, 100, 0.785, 1, 0, 196.499, 148.25)

  expect(test).toEqualCloseTo(expected)
})

test('should convert an arc parameterization into a center parameterization', () => {
  const test = arcToEllipse(arc(100, 100, 50, 100, Math.PI / 4, 1, 0, 200, 150))
  const expected = ellipse(150, 125, 50, 100, 0.785, 2.976, -0.165)

  expect(test).toEqualCloseTo(expected)
})

test('should transform radii and rotation of an arc', () => {
  const test = transformArcParameters(
    arc(0, 0, 100, 50, Math.PI / 4, 1, 0, 100, 0),
    translate(100, 100)(),
  )
})

test('should return the ellipse foci', () => {})
