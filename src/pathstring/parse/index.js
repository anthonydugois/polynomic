/* @flow */

import type { PointCodeT } from "../../types/Point"
import type { PathT } from "../../types/Path"

import * as points from "../../point/points"
import { isM } from "../../point/is"
import segments from "../segments"

export default function parse(
  d: string,
): PathT {
  return path(segments(d))
}

function path(
  segments: Array<Array<string | number>>,
): PathT {
  let first

  return segments.reduce(
    (
      acc: PathT,
      [code, ...parameters],
    ): PathT => {
      const fn: Function = points[code]
      let pointList, previous

      if (acc.length > 0) {
        previous = acc[acc.length - 1]
      }

      if (previous && isM(previous)) {
        first = previous
      }

      if (fn.length > 0) {
        pointList = chunks(parameters, fn.length)
        pointList = pointList.map((chunk) => previous = fn(...chunk, previous))
      } else {
        pointList = [fn(first)]
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
