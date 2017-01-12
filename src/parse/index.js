// @flow

import type { PointCodeT, PointT, PathT } from '../types'

import {
  curry,
  reduce,
} from 'lodash/fp'

import { point } from '../core/point'
import * as points from '../points'
import { isM } from '../is'
import { findLastPoint, findLastM } from '../find'

const mapping : Object = {
  m: 2,
  l: 2,
  h: 1,
  v: 1,
  q: 4,
  t: 2,
  c: 6,
  s: 4,
  a: 7,
  z: 0,
}

export const parse : Function = curry((
  d : string,
) : PathT => reduce(
  (
    acc : PathT,
    segment : Array<string | number>,
  ) : PathT => {
    const code : string = String(segment[0])
    const parameters : Array<string | number> = segment.slice(1)
    const fct : Function = points[code]

    if (code.toLowerCase() !== 'z') {
      chunks(parameters, mapping[code.toLowerCase()]).forEach(
        (chunk) => acc.push(fct(...chunk, findLastPoint(acc)))
      )
    } else {
      acc.push(fct(findLastM(acc)))
    }

    return acc
  },
  [],
  parseSegments(d),
))

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
