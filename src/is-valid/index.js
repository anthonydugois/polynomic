// @flow

import * as points from '../points'
import { parseSegments } from '../parse'

const pointsArgs = {
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

export const isValid : Function = (d : string) : boolean => beginWithMoveto(d)
  && segmentsHaveCorrectParameters(d)
  && noInvalidCharacters(d)

export const beginWithMoveto : Function = (d : string) : boolean =>
  d.trim()[0].toLowerCase() === 'm'

export const segmentsHaveCorrectParameters : Function = (d : string) : boolean =>
  parseSegments(d).every(([code, ...parameters] : Array<string | number>) : boolean => {
    const expected : number = pointsArgs[code.toString().toLowerCase()]

    return parameters.length === expected
      || parameters.length % expected === 0
  })

export const noInvalidCharacters : Function = (d : string) : boolean =>
  !/[^mlhvqtcsaze\d\s,.+-]/gi.test(d)
