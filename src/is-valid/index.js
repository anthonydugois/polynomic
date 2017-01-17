// @flow

import * as points from '../points'
import { parseSegments } from '../parse'

export const isValid : Function = (d : string) : boolean =>
  isFirstPointM(d)
  && hasCorrectNumberOfParameters(d)
  && noInvalidCharacters(d)

export const isFirstPointM : Function = (d : string) : boolean =>
  /^m/gi.test(d.trim())

export const hasCorrectNumberOfParameters : Function = (d : string) : boolean =>
  parseSegments(d).every(
    ([code, ...parameters] : Array<string | number>) : boolean =>
      typeof points[code] === 'function'
      && parameters.length >= points[code].length
  )

export const noInvalidCharacters : Function = (d : string) : boolean =>
  /^[mlhvqtcsaze\d\s,.+-]*$/gi.test(d)
