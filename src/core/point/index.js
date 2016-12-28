// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
} from '../../types'

import { curry } from 'lodash/fp'

export const point : Function = curry((
  code : PointCodeT = '',
  x : number = 0,
  y : number = 0,
  parameters : PointParamsT = {},
) : PointT => ({
  code,
  x,
  y,
  parameters,
}))
