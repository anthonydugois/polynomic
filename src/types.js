// @flow

export type CoordsT = {
  x : number,
  y : number,
  z : number,
}

export type WeakCoordsT = {
  x : number | string,
  y : number | string,
  z ?: number,
}

export type MatrixT = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
]

export type VectorT = [
  number,
  number,
  number,
  number,
]

export type PathTransformOptionsT = {
  indices : Array<number>,
  transformOrigin : WeakCoordsT,
}

export type PointCodeT =
  | ''
  | 'm'
  | 'M'
  | 'l'
  | 'L'
  | 'h'
  | 'H'
  | 'v'
  | 'V'
  | 'q'
  | 'Q'
  | 't'
  | 'T'
  | 'c'
  | 'C'
  | 's'
  | 'S'
  | 'a'
  | 'A'
  | 'z'
  | 'Z'

export type PointParamsT = {
  x1 ?: number,
  y1 ?: number,
  x2 ?: number,
  y2 ?: number,
  rx ?: number,
  ry ?: number,
  rotation ?: number,
  large ?: 0 | 1,
  sweep ?: 0 | 1,
}

export type PointT = {
  code : PointCodeT,
  x : number,
  y : number,
  parameters : PointParamsT,
}

export type PathT = Array<PointT>

export type PolygonT = {
  points : string,
}

export type PolylineT = {
  points : string,
}

export type LineT = {
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
}

export type RectT = {
  x : number,
  y : number,
  width : number,
  height : number,
  rx ?: number,
  ry ?: number,
}

export type CircleT = {
  cx : number,
  cy : number,
  r : number,
}

export type EllipseT = {
  cx : number,
  cy : number,
  rx : number,
  ry : number,
  phi : number,
  start : number,
  end : number,
}

export type ArcT = {
  x1 : number,
  y1 : number,
  rx : number,
  ry : number,
  phi : number,
  large : 0 | 1,
  sweep : 0 | 1,
  x2 : number,
  y2 : number,
}

export type PrimitiveT =
  | PointT
  | PathT
  | PolygonT
  | PolylineT
  | LineT
  | RectT
  | CircleT
  | EllipseT
  | ArcT
