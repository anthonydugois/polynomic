// @flow

import { M, L, H, V, Q, T, C, S, A } from "../core/_factories";
import { is, isRel } from "../core/_params";

import {
  createVec,
  multVec,
  transform2mat,
  endpoint2center,
  transformEllipse,
  rad2deg,
} from "../core/_maths";

import { dispatcher } from "../dispatcher";

/**
 * TODO: comment this dispatcher
 */
export const transformDispatcher = dispatcher(
  {
    fallback: (vecs: Vec[], seg: Seg) => seg,
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      m0: Mat,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
    before: (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
      m0: Mat,
      indices: number[],
    ) => [
      // Special case: the current segment is relative and the previous segment
      // is not processed; it means that the current relative segment should be
      // based on not-transformed coordinates
      isRel(seg) &&
      index > 0 &&
      indices.length > 0 &&
      !indices.includes(index - 1)
        ? createVec(x0, y0, 0, 1)
        : multVec(m0, createVec(x0, y0, 0, 1)),
      multVec(m0, createVec(x1, y1, 0, 1)),
      multVec(m0, createVec(x2, y2, 0, 1)),
      multVec(m0, createVec(x3, y3, 0, 1)),
    ],
  },
  [
    (seg: Seg) => is("m", seg, true),
    ([[ax0, ay0], , , [ax3, ay3]]: Vec[], seg: Seg, index: number) =>
      M(isRel(seg) && index > 0, ax0, ay0, ax3, ay3),
  ],
  [
    (seg: Seg) => is("l", seg, true),
    ([[ax0, ay0], , , [ax3, ay3]]: Vec[], seg: Seg, index: number) =>
      L(isRel(seg) && index > 0, ax0, ay0, ax3, ay3),
  ],
  [
    (seg: Seg) => is("h", seg, true),
    ([[ax0, ay0], , , [ax3, ay3]]: Vec[], seg: Seg, index: number) =>
      ay3 !== ay0
        ? L(isRel(seg) && index > 0, ax0, ay0, ax3, ay3)
        : H(isRel(seg) && index > 0, ax0, ay0, ax3, ay3),
  ],
  [
    (seg: Seg) => is("v", seg, true),
    ([[ax0, ay0], , , [ax3, ay3]]: Vec[], seg: Seg, index: number) =>
      ax3 !== ax0
        ? L(isRel(seg) && index > 0, ax0, ay0, ax3, ay3)
        : V(isRel(seg) && index > 0, ax0, ay0, ax3, ay3),
  ],
  [
    (seg: Seg) => is("q", seg, true),
    ([[ax0, ay0], [ax1, ay1], , [ax3, ay3]]: Vec[], seg: Seg, index: number) =>
      Q(isRel(seg) && index > 0, ax0, ay0, ax1, ay1, ax3, ay3),
  ],
  [
    (seg: Seg) => is("t", seg, true),
    ([[ax0, ay0], [ax1, ay1], , [ax3, ay3]]: Vec[], seg: Seg, index: number) =>
      T(isRel(seg) && index > 0, ax0, ay0, ax1, ay1, ax3, ay3),
  ],
  [
    (seg: Seg) => is("c", seg, true),
    (
      [[ax0, ay0], [ax1, ay1], [ax2, ay2], [ax3, ay3]]: Vec[],
      seg: Seg,
      index: number,
    ) => C(isRel(seg) && index > 0, ax0, ay0, ax1, ay1, ax2, ay2, ax3, ay3),
  ],
  [
    (seg: Seg) => is("s", seg, true),
    (
      [[ax0, ay0], [ax1, ay1], [ax2, ay2], [ax3, ay3]]: Vec[],
      seg: Seg,
      index: number,
    ) => S(isRel(seg) && index > 0, ax0, ay0, ax1, ay1, ax2, ay2, ax3, ay3),
  ],
  [
    (seg: Seg) => is("a", seg, true),
    (
      [[ax0, ay0], , , [ax3, ay3]]: Vec[],
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3, rx, ry, rad, large, sweep }: AbsParams,
      m0: Mat,
    ) => {
      const c = endpoint2center(x0, y0, rx, ry, rad, large, sweep, x3, y3),
        t = transformEllipse(c.cx, c.cy, c.rx, c.ry, c.phi, m0);

      return A(
        isRel(seg) && index > 0,
        ax0,
        ay0,
        t.rx,
        t.ry,
        rad2deg(t.phi),
        large,
        sweep,
        ax3,
        ay3,
      );
    },
  ],
);

/**
 * TODO: comment this dispatcher
 */
export const matrixDispatcher = (
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  indices: number[],
) =>
  transformDispatcher(
    seg,
    index,
    segs,
    params,
    transform2mat("matrix", a, b, c, d, e, f),
    indices,
  );

/**
 * TODO: comment this dispatcher
 */
export const translateDispatcher = (
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  tx: number,
  ty: number,
  indices: number[],
) =>
  transformDispatcher(
    seg,
    index,
    segs,
    params,
    transform2mat("translate", tx, ty),
    indices,
  );

/**
 * TODO: comment this dispatcher
 */
export const scaleDispatcher = (
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  sx: number,
  sy: number,
  indices: number[],
) =>
  transformDispatcher(
    seg,
    index,
    segs,
    params,
    transform2mat("scale", sx, sy),
    indices,
  );

/**
 * TODO: comment this dispatcher
 */
export const rotateDispatcher = (
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  a: number,
  cx: number,
  cy: number,
  indices: number[],
) =>
  transformDispatcher(
    seg,
    index,
    segs,
    params,
    transform2mat("rotate", a, cx, cy),
    indices,
  );

/**
 * TODO: comment this dispatcher
 */
export const skewXDispatcher = (
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  a: number,
  indices: number[],
) =>
  transformDispatcher(
    seg,
    index,
    segs,
    params,
    transform2mat("skewX", a),
    indices,
  );

/**
 * TODO: comment this dispatcher
 */
export const skewYDispatcher = (
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  a: number,
  indices: number[],
) =>
  transformDispatcher(
    seg,
    index,
    segs,
    params,
    transform2mat("skewY", a),
    indices,
  );
