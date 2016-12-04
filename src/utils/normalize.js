// @flow

export function normalize(
  n : number,
  min : number = 0,
  max : number = 0,
) : number {
  return (n - min) / (max - min)
}
