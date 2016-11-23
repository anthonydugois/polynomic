/* @flow */

import type { PathT } from '../../types/Path'

import { M, L, Z } from '../../point/points'
import segments from '../../pathstring/segments'

export default function fromPolygon(
  polygon: HTMLElement,
): PathT {
  if (polygon instanceof HTMLElement && polygon.nodeName.toLowerCase() !== 'polygon') {
    throw new Error('The element you provided in the `fromPolygon` function should be a valid SVG polygon node.')
  }

  const points: string = polygon.getAttribute('points')
  const coords: Array<string | number> = segments(points)[0]

  return coords.reduce(
    (
      acc: PathT,
      coord: string | number,
      index: number,
    ): PathT => {
      if (index > 0 && index === coords.length - 1) {
        acc.push(Z()(acc[0]))
      } else if (index % 2 === 0) {
        const x: number = parseFloat(coord)
        const y: number = parseFloat(coords[index + 1])
        const factory: Function = index === 0 ? M : L

        acc.push(factory(x, y)())
      }

      return acc
    },
    [],
  )
}
