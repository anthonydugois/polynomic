// @flow

import type { Vector4T } from '../../types'

export function length(
  v : Vector4T,
) : number {
  return Math.sqrt((v[0] ** 2) + (v[1] ** 2) + (v[2] ** 2))
}

export function dot(
  u : Vector4T,
  v : Vector4T,
) : number {
  return (u[0] * v[0]) + (u[1] * v[1]) + (u[2] * v[2])
}

export function angle(
  u : Vector4T,
  v : Vector4T,
) : number {
  const sign : -1 | 1 = (u[0] * v[1]) - (u[1] * v[0]) < 0 ? -1 : 1
  const _uv : number = dot(u, v)
  const _u : number = length(u)
  const _v : number = length(v)

  return sign * Math.acos(_uv / (_u * _v))
}
