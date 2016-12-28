
// @flow

import type { PointT } from '../types'

import { curry } from 'lodash/fp'
import * as codes from '../core/codes'
import { round, defaultPrecision } from '../core/utils/round'
import { format } from '../core/utils/format'

export const m : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.m }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const M : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.M }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const l : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.l }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const L : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.L }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const h : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.h }
  ${ round(current.x - previous.x, precision) }
`)

export const H : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.H }
  ${ round(current.x, precision) }
`)

export const v : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.v }
  ${ round(current.y - previous.y, precision) }
`)

export const V : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.V }
  ${ round(current.y, precision) }
`)

export const q : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.q }
  ${
    typeof current.parameters.x1 !== 'undefined' ?
      round(current.parameters.x1 - previous.x, precision) :
      0
  }
  ${
    typeof current.parameters.y1 !== 'undefined' ?
      round(current.parameters.y1 - previous.y, precision) :
      0
  }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const Q : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.Q }
  ${
    typeof current.parameters.x1 !== 'undefined' ?
      round(current.parameters.x1, precision) :
      0
  }
  ${
    typeof current.parameters.y1 !== 'undefined' ?
      round(current.parameters.y1, precision) :
      0
  }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const t : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.t }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const T : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.T }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const c : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.c }
  ${
    typeof current.parameters.x1 !== 'undefined' ?
      round(current.parameters.x1 - previous.x, precision) :
      0
  }
  ${
    typeof current.parameters.y1 !== 'undefined' ?
      round(current.parameters.y1 - previous.y, precision) :
      0
  }
  ${
    typeof current.parameters.x2 !== 'undefined' ?
      round(current.parameters.x2 - previous.x, precision) :
      0
  }
  ${
    typeof current.parameters.y2 !== 'undefined' ?
      round(current.parameters.y2 - previous.y, precision) :
      0
  }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const C : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.C }
  ${
    typeof current.parameters.x1 !== 'undefined' ?
      round(current.parameters.x1, precision) :
      0
  }
  ${
    typeof current.parameters.y1 !== 'undefined' ?
      round(current.parameters.y1, precision) :
      0
  }
  ${
    typeof current.parameters.x2 !== 'undefined' ?
      round(current.parameters.x2, precision) :
      0
  }
  ${
    typeof current.parameters.y2 !== 'undefined' ?
      round(current.parameters.y2, precision) :
      0
  }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const s : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.s }
  ${
    typeof current.parameters.x2 !== 'undefined' ?
      round(current.parameters.x2 - previous.x, precision) :
      0
  }
  ${
    typeof current.parameters.y2 !== 'undefined' ?
      round(current.parameters.y2 - previous.y, precision) :
      0
  }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const S : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.S }
  ${
    typeof current.parameters.x2 !== 'undefined' ?
      round(current.parameters.x2, precision) :
      0
  }
  ${
    typeof current.parameters.y2 !== 'undefined' ?
      round(current.parameters.y2, precision) :
      0
  }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const a : Function = curry((
  current : PointT,
  previous : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.a }
  ${
    typeof current.parameters.rx !== 'undefined' ?
      round(current.parameters.rx, precision) :
      0
  }
  ${
    typeof current.parameters.ry !== 'undefined' ?
      round(current.parameters.ry, precision) :
      0
  }
  ${
    typeof current.parameters.rotation !== 'undefined' ?
      round(current.parameters.rotation, precision) :
      0
  }
  ${
    typeof current.parameters.large !== 'undefined' ?
      current.parameters.large :
      0
  }
  ${
    typeof current.parameters.sweep !== 'undefined' ?
      current.parameters.sweep :
      0
  }
  ${ round(current.x - previous.x, precision) }
  ${ round(current.y - previous.y, precision) }
`)

export const A : Function = curry((
  current : PointT,
  precision : number = defaultPrecision,
) : string => format`
  ${ codes.A }
  ${
    typeof current.parameters.rx !== 'undefined' ?
      round(current.parameters.rx, precision) :
      0
  }
  ${
    typeof current.parameters.ry !== 'undefined' ?
      round(current.parameters.ry, precision) :
      0
  }
  ${
    typeof current.parameters.rotation !== 'undefined' ?
      round(current.parameters.rotation, precision) :
      0
  }
  ${
    typeof current.parameters.large !== 'undefined' ?
      current.parameters.large :
      0
  }
  ${
    typeof current.parameters.sweep !== 'undefined' ?
      current.parameters.sweep :
      0
  }
  ${ round(current.x, precision) }
  ${ round(current.y, precision) }
`)

export const z : Function = curry(() : string => format`
  ${ codes.z }
`)

export const Z : Function = curry(() : string => format`
  ${ codes.Z }
`)
