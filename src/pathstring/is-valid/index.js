/* @flow */

import * as points from "../../point/points"
import segments from "../segments"

export default function isValid(d: string): boolean {
  return checkFirstM(d)
    && checkParametersNumber(d)
    && noInvalidCharacters(d)
}

function checkFirstM(d: string): boolean {
  return /^m/gi.test(d.trim())
}

function checkParametersNumber(d: string): boolean {
  return segments(d).every(
    ([code, ...parameters]) => typeof points[code] === "function"
      && parameters.length >= points[code].length
  )
}

function noInvalidCharacters(d: string): boolean {
  return /^[mlhvqtcsaze\d\s,.-]*$/gi.test(d)
}
