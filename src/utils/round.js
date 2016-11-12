/* @flow */

export default function round(
  n: number,
  precision: number = 3,
): number {
  return +n.toFixed(precision)
}
