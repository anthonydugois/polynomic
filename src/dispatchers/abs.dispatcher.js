// @flow

import { is } from "../core/_params";
import { M, L, H, V, Q, T, C, S, A } from "../core/_factories";

import { dispatcher } from "../dispatcher";

export const absDispatcher = dispatcher(
  {
    fallback: (seg: Seg) => seg,
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
  },
  [
    (seg: Seg) => is("m", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      indices: number[],
    ) => M(false, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("l", seg),
    (seg: Seg, index: number, segs: SegList, { x0, y0, x3, y3 }: AbsParams) =>
      L(false, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("h", seg),
    (seg: Seg, index: number, segs: SegList, { x0, y0, x3, y3 }: AbsParams) =>
      H(false, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("v", seg),
    (seg: Seg, index: number, segs: SegList, { x0, y0, x3, y3 }: AbsParams) =>
      V(false, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("q", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
    ) => Q(false, x0, y0, x1, y1, x3, y3),
  ],
  [
    (seg: Seg) => is("t", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
    ) => T(false, x0, y0, x1, y1, x3, y3),
  ],
  [
    (seg: Seg) => is("c", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
    ) => C(false, x0, y0, x1, y1, x2, y2, x3, y3),
  ],
  [
    (seg: Seg) => is("s", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
    ) => S(false, x0, y0, x1, y1, x2, y2, x3, y3),
  ],
  [
    (seg: Seg) => is("a", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3, rx, ry, angle, large, sweep }: AbsParams,
    ) => A(false, x0, y0, rx, ry, angle, large, sweep, x3, y3),
  ],
);
