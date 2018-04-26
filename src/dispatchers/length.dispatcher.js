// @flow

import { is } from "../core/_params";

import {
  sqrt,
  endpoint2center,
  quadraticCurve,
  cubicCurve,
  ellipticalCurve,
} from "../core/_maths";

import { dispatcher } from "../dispatcher";

function approximateCurveLength(
  f: (...number[]) => Vec,
  values,
  x0,
  y0,
  resolution,
) {
  let len = 0;

  for (let i = 0, ax = x0, ay = y0; i < resolution; ++i) {
    const t = (i + 1) / resolution,
      [bx, by] = f(...values, t);

    len += sqrt((bx - ax) ** 2 + (by - ay) ** 2);
    ax = bx;
    ay = by;
  }

  return len;
}

export const lengthDispatcher = dispatcher(
  {
    fallback: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: number,
    ) => acc,
  },
  [
    (seg: Seg) =>
      is("l", seg, true) ||
      is("h", seg, true) ||
      is("v", seg, true) ||
      is("z", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      acc: number,
    ) => acc + sqrt((x3 - x0) ** 2 + (y3 - y0) ** 2),
  ],
  [
    (seg: Seg) => is("q", seg, true) || is("t", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
      acc: number,
      resolution: number,
    ) =>
      acc +
      approximateCurveLength(
        quadraticCurve,
        [x0, y0, x1, y1, x3, y3],
        x0,
        y0,
        resolution,
      ),
  ],
  [
    (seg: Seg) => is("c", seg, true) || is("s", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
      acc: number,
      resolution: number,
    ) =>
      acc +
      approximateCurveLength(
        cubicCurve,
        [x0, y0, x1, y1, x2, y2, x3, y3],
        x0,
        y0,
        resolution,
      ),
  ],
  [
    (seg: Seg) => is("a", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3, rx, ry, rad, large, sweep }: AbsParams,
      acc: number,
      resolution: number,
    ) => {
      const c = endpoint2center(x0, y0, rx, ry, rad, large, sweep, x3, y3);

      return (
        acc +
        approximateCurveLength(
          ellipticalCurve,
          [c.cx, c.cy, c.rx, c.ry, c.phi, c.theta, c.delta],
          x0,
          y0,
          resolution,
        )
      );
    },
  ],
);
