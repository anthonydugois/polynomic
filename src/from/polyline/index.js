// @flow

import type { PathT } from '../../types'

import { M, L } from '../../point'
import { parseSegments } from '../../pathstring/parse-segments'

export function fromPolyline(
  polyline : HTMLElement,
) : PathT {
  if (polyline instanceof HTMLElement && polyline.nodeName.toLowerCase() !== 'polyline') {
    throw new Error('The element you provided in the `fromPolyline` function should be a valid SVG polyline node.')
  }

  const points : string = polyline.getAttribute('points')
  const coords : Array<string | number> = parseSegments(points)[0]

  return coords.reduce(
    (
      acc : PathT,
      coord : string | number,
      index : number,
    ): PathT => {
      if (index % 2 === 0) {
        const x : number = parseFloat(coord)
        const y : number = parseFloat(coords[index + 1])
        const cmd : Function = index === 0 ? M : L

        acc.push(cmd(x, y)())
      }

      return acc
    },
    [],
  )
}
