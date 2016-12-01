// @flow

export function angle(
  alpha: number | string = 0,
): number {
  return typeof alpha === 'string' ?
    convertAngle(alpha) :
    alpha
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

export function parseAngle(
  alpha: string,
  unit: string = 'deg',
): number {
  return parseFloat(alpha.replace(unit, ''))
}

export function degToRad(
  deg: number = 0,
): number {
  return (Math.PI / 180) * deg
}

export function gradToRad(
  grad: number = 0,
): number {
  return (Math.PI / 200) * grad
}

export function turnToRad(
  turn: number = 0,
): number {
  return (2 * Math.PI) * turn
}
