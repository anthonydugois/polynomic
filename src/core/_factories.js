// @flow

import { CONFIG } from "./_config";

export function createRect(
  x: number = 0,
  y: number = 0,
  width: number = 0,
  height: number = 0,
  rx: number = 0,
  ry: number = 0,
): PrimitiveRect {
  return {
    type: "PRIMITIVE_RECT",
    x,
    y,
    width,
    height,
    rx,
    ry,
  };
}

export function createCircle(
  cx: number = 0,
  cy: number = 0,
  r: number = 0,
): PrimitiveCircle {
  return {
    type: "PRIMITIVE_CIRCLE",
    cx,
    cy,
    r,
  };
}

export function createEllipse(
  cx: number = 0,
  cy: number = 0,
  rx: number = 0,
  ry: number = 0,
): PrimitiveEllipse {
  return {
    type: "PRIMITIVE_ELLIPSE",
    cx,
    cy,
    rx,
    ry,
  };
}

export function createLine(
  x1: number = 0,
  y1: number = 0,
  x2: number = 0,
  y2: number = 0,
): PrimitiveLine {
  return {
    type: "PRIMITIVE_LINE",
    x1,
    y1,
    x2,
    y2,
  };
}

export function createPolyline(points: string = ""): PrimitivePolyline {
  return {
    type: "PRIMITIVE_POLYLINE",
    points,
  };
}

export function createPolygon(points: string = ""): PrimitivePolygon {
  return {
    type: "PRIMITIVE_POLYGON",
    points,
  };
}

export function createPath(d: string = ""): PrimitivePath {
  return {
    type: "PRIMITIVE_PATH",
    d,
  };
}

export function createAbsParams(): AbsParams {
  return {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0,
    mx: 0,
    my: 0,
    rx: 0,
    ry: 0,
    angle: 0,
    rad: 0,
    large: 0,
    sweep: 0,
  };
}

export function createSeg(type: string | number, ...params: number[]): Seg {
  return [typeof type === "string" ? CONFIG.SEGS.TYPES[type] : type, ...params];
}

export function M(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Seg {
  return rel ? createSeg("m", x1 - x0, y1 - y0) : createSeg("M", x1, y1);
}

export function L(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Seg {
  return rel ? createSeg("l", x1 - x0, y1 - y0) : createSeg("L", x1, y1);
}

export function H(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Seg {
  return rel ? createSeg("h", x1 - x0) : createSeg("H", x1);
}

export function V(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Seg {
  return rel ? createSeg("v", y1 - y0) : createSeg("V", y1);
}

export function Q(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Seg {
  return rel
    ? createSeg("q", x1 - x0, y1 - y0, x2 - x0, y2 - y0)
    : createSeg("Q", x1, y1, x2, y2);
}

export function T(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): Seg {
  return rel ? createSeg("t", x2 - x0, y2 - y0) : createSeg("T", x2, y2);
}

export function C(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): Seg {
  return rel
    ? createSeg("c", x1 - x0, y1 - y0, x2 - x0, y2 - y0, x3 - x0, y3 - y0)
    : createSeg("C", x1, y1, x2, y2, x3, y3);
}

export function S(
  rel: boolean,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): Seg {
  return rel
    ? createSeg("s", x2 - x0, y2 - y0, x3 - x0, y3 - y0)
    : createSeg("S", x2, y2, x3, y3);
}

export function A(
  rel: boolean,
  x0: number,
  y0: number,
  rx0: number,
  ry0: number,
  angle0: number,
  large0: number,
  sweep0: number,
  x1: number,
  y1: number,
): Seg {
  return rel
    ? createSeg("a", rx0, ry0, angle0, large0, sweep0, x1 - x0, y1 - y0)
    : createSeg("A", rx0, ry0, angle0, large0, sweep0, x1, y1);
}

export function Z(): Seg {
  return createSeg("z");
}
