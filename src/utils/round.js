/* @flow */

export const defaultPrecision: number = 3

export default function round(
  n: number,
  precision: number = defaultPrecision,
): number {
  return +n.toFixed(precision)
}
