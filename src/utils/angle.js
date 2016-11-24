// @flow

export function angle(
  alpha: number | string,
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
