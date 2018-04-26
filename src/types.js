// @flow

// Seg types

type Seg = $ReadOnlyArray<number>;

type SegList = Seg[];

type SegListLike = string | SegList | Primitive | Element;

// Primitive types

type PrimitivePath = {
  type: "PRIMITIVE_PATH",
  d: string,
};

type PrimitiveRect = {
  type: "PRIMITIVE_RECT",
  x: number,
  y: number,
  width: number,
  height: number,
  rx: number,
  ry: number,
};

type PrimitiveCircle = {
  type: "PRIMITIVE_CIRCLE",
  cx: number,
  cy: number,
  r: number,
};

type PrimitiveEllipse = {
  type: "PRIMITIVE_ELLIPSE",
  cx: number,
  cy: number,
  rx: number,
  ry: number,
};

type PrimitiveLine = {
  type: "PRIMITIVE_LINE",
  x1: number,
  y1: number,
  x2: number,
  y2: number,
};

type PrimitivePolyline = {
  type: "PRIMITIVE_POLYLINE",
  points: string,
};

type PrimitivePolygon = {
  type: "PRIMITIVE_POLYGON",
  points: string,
};

type Primitive =
  | PrimitivePath
  | PrimitiveRect
  | PrimitiveCircle
  | PrimitiveEllipse
  | PrimitiveLine
  | PrimitivePolyline
  | PrimitivePolygon;

type AbsParams = {
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  mx: number,
  my: number,
  rx: number,
  ry: number,
  angle: number,
  rad: number,
  large: number,
  sweep: number,
};

type Iteratee<R> = (Seg, number, SegList, AbsParams, ...*[]) => R;

// Math types

type Vec = [number, number, number, number];

type Mat = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

type CenterParameterization = {
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  phi: number,
  theta: number,
  delta: number,
};

type EndpointParameterization = {
  x0: number,
  y0: number,
  rx: number,
  ry: number,
  phi: number,
  large: number,
  sweep: number,
  x1: number,
  y1: number,
};

// A, B, C, D, E, F coefficients of a conic section Cartesian equation:
// Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0
type ConicParameterization = {
  x0: number,
  y0: number,
  coefficients: [number, number, number, number, number, number],
  x1: number,
  y1: number,
};
