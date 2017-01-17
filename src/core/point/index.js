// @flow

import type {
  PointT,
  PrimitivePointT,
  PointParamsT,
  PointCodeT,
} from '../../types'

export const point : Function = (
  code ?: PointCodeT = '',
  x ?: number = 0,
  y ?: number = 0,
  parameters ?: PointParamsT = Object.freeze({}),
) : PointT => Object.freeze({
  type: 'point',
  code,
  x,
  y,
  parameters,
})

export const hydrate : Function = (
  cmd : PointT,
  hydratee : PrimitivePointT = point(),
) : PointT => typeof cmd === 'function' ? cmd(hydratee) : cmd
