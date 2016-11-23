/* @flow */

export const defaultPrecision: number = 3

export function round(
  n: number,
  precision: number = defaultPrecision,
): number {
  return +n.toFixed(precision)
}
