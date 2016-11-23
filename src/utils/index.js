/* @flow */

import type { PathT, PathBoundingBoxT } from '../types/Path'
import type { CoordsT } from '../types/Coords'

const positions = {
  left: 0,
  right: 100,
  top: 0,
  bottom: 100,
  center: 50,
}

export function relativeToAbsoluteX(
  x: string,
  bbox: PathBoundingBoxT,
): number {
  const _x: string = x.toLowerCase()
  const X: number = Object.keys(positions).includes(_x) ?
    positions[_x] :
    parseRelative(_x)

  return bbox.x + ((bbox.width * X) / 100)
}

export function relativeToAbsoluteY(
  y: string,
  bbox: PathBoundingBoxT,
): number {
  const _y: string = y.toLowerCase()
  const Y: number = Object.keys(positions).includes(_y) ?
    positions[_y] :
    parseRelative(_y)

  return bbox.y + ((bbox.height * Y) / 100)
}

function parseRelative(
  str: string,
): number {
  return parseFloat(str.replace('%', ''))
}

function parseAngle(
  alpha: string,
  unit: string = 'deg',
): number {
  return parseFloat(alpha.replace(unit, ''))
}

function degToRad(
  deg: number,
): number {
  return (Math.PI / 180) * deg
}

function gradToRad(
  grad: number,
): number {
  return (Math.PI / 200) * grad
}

function turnToRad(
  turn: number,
): number {
  return (2 * Math.PI) * turn
}

function convertAngle(
  alpha: string,
): number {
  alpha = alpha.trim()

  switch (true) {
  case alpha.endsWith('deg'):
    return degToRad(parseAngle(alpha, 'deg'))

  case alpha.endsWith('rad'):
    return parseAngle(alpha, 'rad')

  case alpha.endsWith('grad'):
    return gradToRad(parseAngle(alpha, 'grad'))

  case alpha.endsWith('turn'):
    return turnToRad(parseAngle(alpha, 'turn'))

  default:
    return parseFloat(alpha)
  }
}

export function angle(
  alpha: number | string,
): number {
  return typeof alpha === 'string' ?
    convertAngle(alpha) :
    alpha
}
