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

export type PathT = Array<PrimitivePointT>

export type PointT = PrimitivePointT | Function

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

export type PrimitivePointT = {
  type: 'point',
  code : PointCodeT,
  x : number,
  y : number,
  parameters : PointParamsT,
}

export type PrimitivePathT = {
  type: 'path',
  d : string,
}

export type PrimitivePolygonT = {
  type: 'polygon',
  points : string,
}

export type PrimitivePolylineT = {
  type: 'polyline',
  points : string,
}

export type PrimitiveLineT = {
  type: 'line',
  x1 : number,
  y1 : number,
  x2 : number,
  y2 : number,
}

export type PrimitiveRectT = {
  type: 'rect',
  x : number,
  y : number,
  width : number,
  height : number,
  rx ?: number,
  ry ?: number,
}

export type PrimitiveCircleT = {
  type: 'circle',
  cx : number,
  cy : number,
  r : number,
}

export type PrimitiveEllipseT = {
  type: 'ellipse',
  cx : number,
  cy : number,
  rx : number,
  ry : number,
  phi : number,
  start : number,
  end : number,
}

export type PrimitiveArcT = {
  type: 'arc',
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
  | PrimitivePointT
  | PrimitivePathT
  | PrimitivePolygonT
  | PrimitivePolylineT
  | PrimitiveLineT
  | PrimitiveRectT
  | PrimitiveCircleT
  | PrimitiveEllipseT
  | PrimitiveArcT
