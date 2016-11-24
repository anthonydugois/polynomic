// @flow

import type { PointT } from '../../types'

export function isRelative(
  current: PointT | Function,
): boolean {
  const type: string = typeof current === 'function' ?
    current.name :
    current.code

  return type.toLowerCase() === type
}
