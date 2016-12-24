// @flow

import type { PointCodeT, PointT, PathT } from '../types'

import { point } from '../core/point'
import * as points from '../points'
import { isM } from '../is'

export function parse(
  d: string,
): PathT {
  let lastM: PointT = point()

  return parseSegments(d).reduce(
    (
      acc: PathT,
      segment: Array<string | number>,
    ): PathT => {
      let previous: PointT  = acc.length > 0 ?
        acc[acc.length - 1] :
        point()

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

export function parseSegments(
  d: string,
): Array<Array<string | number>> {
  return d
    .replace(/[^mlhvqtcsaze\d\s,.+-]/gi, '')
    .split(/([mlhvqtcsaz][e\d\s,.+-]*)/i)
    .filter(isStringNotEmpty)
    .map(splitSegment)
}

function isStringNotEmpty(
  str: string,
): boolean {
  return str.trim().length > 0
}

function convertNumberLikeInActualNumber(
  str: string,
): string | number {
  const trimmed = str.trim()

  return isNaN(trimmed) ?
    trimmed :
    parseFloat(trimmed)
}

function splitSegment(
  segment: string,
): Array<string | number> {
  return segment
    .replace(/[\s,]+/g, ' ')
    .split(/([mlhvqtcsaz]|(?:-|\+)*[\d.]*(?:e(?:-|\+)*[\d.]*)?)/i)
    .filter(isStringNotEmpty)
    .map(convertNumberLikeInActualNumber)
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
