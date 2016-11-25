// @flow

import type { PointCodeT, PointT, PathT } from '../../types'

import * as points from '../../point'
import { isM } from '../../point/is'
import { parseSegments } from '../parse-segments'

export function parse(
  d: string,
): PathT {
  let lastM: PointT = points.defaultPoint

  return parseSegments(d).reduce(
    (
      acc: PathT,
      segment: Array<string | number>,
    ): PathT => {
      let previous: PointT  = acc.length > 0 ?
        acc[acc.length - 1] :
        points.defaultPoint

      if (isM(previous)) {
        lastM = previous
      }

      const [code, ...parameters]: Array<string | number> = segment
      const pointFactory: Function = points[code]

      if (pointFactory.length > 0) {
        const path: PathT = chunks(parameters, pointFactory.length).map(
          (chunk) => previous = pointFactory(...chunk)(previous)
        )

        acc.push(...path)
      } else {
        const point: PointT = pointFactory()(lastM)

        acc.push(point)
      }

      return acc
    },
    [],
  )
}

function chunks(
  array: Array<any>,
  n: number,
): Array<Array<any>> {
  return array.reduce(
    (
      acc: Array<Array<any>>,
      value: any,
      index: number,
    ): Array<Array<any>> => {
      if (index % n === 0) {
        acc.push([value])
      } else {
        acc[acc.length - 1].push(value)
      }

      return acc
    },
    [],
  )
}
