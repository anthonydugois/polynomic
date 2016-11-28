// @flow

import type { PointT, PointParamsT, CoordsT } from '../../types'

import { degToRad } from '../../utils/angle'

// this function follows the implementation described
// in https://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter
export function center(
  from : PointT | Function,
  to : PointT | Function,
) : CoordsT {
  const p1 : PointT = typeof from === 'function' ? from() : from
  const p2 : PointT = typeof to === 'function' ? to(p1) : to

  const {
    rx = 0,
    ry = 0,
    rotation = 0,
    large = 0,
    sweep = 0,
  } : PointParamsT = p2.parameters

  if (rx === 0 || ry === 0) {
    return {
      x: (p2.x - p1.x) / 2,
      y: (p2.y - p1.y) / 2,
    }
  }

  const theta : number = degToRad(rotation)
  const c : number = Math.cos(theta)
  const s : number = Math.sin(theta)
  const sign : -1 | 1 = large === sweep ? -1 : 1

  const _x : number = (c * (p1.x - p2.x) / 2) + (s * (p1.y - p2.y) / 2)
  const _y : number = (c * (p1.y - p2.y) / 2) - (s * (p1.x - p2.x) / 2)

  const n : number = ((rx ** 2) * (ry ** 2))
    - ((rx ** 2) * (_y ** 2))
    - ((ry ** 2) * (_x ** 2))
  const d : number = ((rx ** 2) * (_y ** 2))
    + ((ry ** 2) * (_x ** 2))
  const coef : number = sign * Math.sqrt(n / d)

  const _cx : number = coef * ((rx * _y) / ry)
  const _cy : number = coef * ((-ry * _x) / rx)

  return {
    x: ((c * _cx) - (s * _cy)) + ((p1.x + p2.x) / 2),
    y: ((s * _cx) + (c * _cy)) + ((p1.y + p2.y) / 2),
  }
}
