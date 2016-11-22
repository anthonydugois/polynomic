/* @flow */

import * as points from "../../point/points"
import segments from "../segments"

export default function isValid(
  d: string,
): boolean {
  return isFirstPointM(d)
    && hasCorrectNumberOfParameters(d)
    && noInvalidCharacters(d)
}

export function isFirstPointM(
  d: string,
): boolean {
  return /^m/gi.test(d.trim())
}

export function hasCorrectNumberOfParameters(
  d: string,
): boolean {
  return segments(d).every(
    (
      [code, ...parameters]: Array<string | number>,
    ): boolean => {
      return typeof points[code] === 'function'
        && parameters.length >= points[code].length
    }
  )
}

export function noInvalidCharacters(
  d: string,
): boolean {
  return /^[mlhvqtcsaze\d\s,.+-]*$/gi.test(d)
}
