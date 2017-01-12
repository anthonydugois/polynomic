// @flow

import type { VectorT } from '../../types'

import { curry } from 'lodash/fp'

export const vec : Function = curry((
  v1 : number = 0,
  v2 : number = v1,
  v3 : number = v1,
  v4 : number = v1,
) : VectorT => [v1, v2, v3, v4])

export const length : Function = curry((
  v : VectorT,
) : number => Math.sqrt((v[0] ** 2) + (v[1] ** 2) + (v[2] ** 2)))

export const dot : Function = curry((
  u : VectorT,
  v : VectorT,
) : number => (u[0] * v[0]) + (u[1] * v[1]) + (u[2] * v[2]))

export const cross : Function = curry((
  u : VectorT,
  v : VectorT,
) : VectorT => vec(
  (u[1] * v[2]) - (u[2] * v[1]),
  (u[2] * v[0]) - (u[0] * v[2]),
  (u[0] * v[1]) - (u[1] * v[0]),
  1,
))

export const angle : Function = curry((
  u : VectorT,
  v : VectorT,
) : number => {
  const [ , , z] : VectorT = cross(u, v)
  const _uv : number = dot(u, v)
  const _u : number = length(u)
  const _v : number = length(v)

  return Math.sign(z) * Math.acos(_uv / (_u * _v))
})
