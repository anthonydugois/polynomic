/* @flow */

import type { PointCodeT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import * as points from "../../point/points"
import { isM } from "../../point/is"
import segments from "../segments"

export default function parse(d: string): PathT {
  return buildPointList(segments(d))
}

function buildPointList(segments: Array<Array<string | number>>): PathT {
  let firstPoint

  return segments.reduce(
    (
      acc: PathT,
      [code, ...parameters],
    ): PathT => {
      const point: Function = points[code]
      let pointList, prev

      if (acc.length > 0) {
        prev = acc[acc.length - 1]
      }

      if (prev && isM(prev)) {
        firstPoint = prev
      }

      if (point.length > 0) {
        pointList = chunks(parameters, point.length)
        pointList = pointList.map((chunk) => prev = point(...chunk, prev))
      } else {
        pointList = [point(firstPoint)]
      }

      return [
        ...acc,
        ...pointList,
      ]
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
