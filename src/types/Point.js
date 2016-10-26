/* @flow */

export type PointT = {
  code: PointCodeT,
  x: number,
  y: number,
  parameters: PointParamsT,
}

export type PointCodeT =
  | ""
  | "m"
  | "M"
  | "l"
  | "L"
  | "h"
  | "H"
  | "v"
  | "V"
  | "q"
  | "Q"
  | "t"
  | "T"
  | "c"
  | "C"
  | "s"
  | "S"
  | "a"
  | "A"
  | "z"
  | "Z"

export type PointParamsT = {
  x1?: number,
  y1?: number,
  x2?: number,
  y2?: number,
  rx?: number,
  ry?: number,
  rotation?: number,
  large?: 0 | 1,
  sweep?: 0 | 1,
}
