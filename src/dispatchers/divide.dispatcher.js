// @flow

import { L, H, V, Q, T, C, S, A } from "../core/_factories";
import { isRel, is } from "../core/_params";

import {
  linearCurve,
  quadraticCurve,
  cubicCurve,
  endpoint2center,
  center2endpoint,
} from "../core/_maths";

import { dispatcher } from "../dispatcher";

function makeLinearDivision(seg, { x0, y0, x3, y3 }, acc, count, f) {
  for (let i = 0; i < count; ++i) {
    const t = 1 / (count - i),
      [ax3, ay3] = linearCurve(x0, y0, x3, y3, t);

    acc.push(f(isRel(seg), x0, y0, ax3, ay3));

    x0 = ax3;
    y0 = ay3;
  }

  return acc;
}

function makeQuadraticDivision(seg, { x0, y0, x1, y1, x3, y3 }, acc, count, f) {
  for (let i = 0; i < count; ++i) {
    const t = 1 / (count - i),
      [ax1, ay1] = linearCurve(x0, y0, x1, y1, t),
      [ax3, ay3] = quadraticCurve(x0, y0, x1, y1, x3, y3, t),
      [bx1, by1] = linearCurve(x1, y1, x3, y3, t);

    acc.push(f(isRel(seg), x0, y0, ax1, ay1, ax3, ay3));

    x0 = ax3;
    y0 = ay3;
    x1 = bx1;
    y1 = by1;
  }

  return acc;
}

function makeCubicDivision(
  seg,
  { x0, y0, x1, y1, x2, y2, x3, y3 },
  acc,
  count,
  f,
) {
  for (let i = 0; i < count; ++i) {
    const t = 1 / (count - i),
      [ax1, ay1] = linearCurve(x0, y0, x1, y1, t),
      [ax2, ay2] = quadraticCurve(x0, y0, x1, y1, x2, y2, t),
      [ax3, ay3] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, t),
      [bx1, by1] = quadraticCurve(x1, y1, x2, y2, x3, y3, t),
      [bx2, by2] = linearCurve(x2, y2, x3, y3, t);

    acc.push(f(isRel(seg), x0, y0, ax1, ay1, ax2, ay2, ax3, ay3));

    x0 = ax3;
    y0 = ay3;
    x1 = bx1;
    y1 = by1;
    x2 = bx2;
    y2 = by2;
  }

  return acc;
}

function makeArcDivision(
  seg,
  { x0, y0, x3, y3, rx, ry, angle, rad, large, sweep },
  acc,
  count,
  f,
) {
  const c = endpoint2center(x0, y0, rx, ry, rad, large, sweep, x3, y3);

  for (let i = 0; i < count; ++i) {
    const t = 1 / (count - i),
      e = center2endpoint(c.cx, c.cy, c.rx, c.ry, c.phi, c.theta, t * c.delta);

    acc.push(
      f(isRel(seg), x0, y0, e.rx, e.ry, angle, e.large, e.sweep, e.x1, e.y1),
    );

    x0 = e.x1;
    y0 = e.y1;
    c.theta += t * c.delta;
    c.delta *= 1 - t;
  }

  return acc;
}

/**
 * TODO: comment this dispatcher
 */
export const divideDispatcher = dispatcher(
  {
    fallback: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
    ) => (acc.push(seg), acc),
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
  },
  [
    (seg: Seg) => is("l", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeLinearDivision(seg, params, acc, count, L),
  ],
  [
    (seg: Seg) => is("h", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeLinearDivision(seg, params, acc, count, H),
  ],
  [
    (seg: Seg) => is("v", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeLinearDivision(seg, params, acc, count, V),
  ],
  [
    (seg: Seg) => is("q", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeQuadraticDivision(seg, params, acc, count, Q),
  ],
  [
    (seg: Seg) => is("t", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeQuadraticDivision(seg, params, acc, count, T),
  ],
  [
    (seg: Seg) => is("c", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeCubicDivision(seg, params, acc, count, C),
  ],
  [
    (seg: Seg) => is("s", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeCubicDivision(seg, params, acc, count, S),
  ],
  [
    (seg: Seg) => is("a", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      count: number,
    ) => makeArcDivision(seg, params, acc, count, A),
  ],
);
