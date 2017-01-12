// @flow

import type {
  PointT,
  PointParamsT,
  PointCodeT,
} from '../../types'

export const point : Function = (
  code ?: PointCodeT = '',
  x ?: number = 0,
  y ?: number = 0,
  parameters ?: PointParamsT = Object.freeze({}),
) : PointT => Object.freeze({
  code,
  x,
  y,
  parameters,
})

export const hydrate : Function = (
  cmd : PointT | Function,
  hydratee : PointT = point(),
) : PointT => typeof cmd === 'function' ? cmd(hydratee) : cmd
