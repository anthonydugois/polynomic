// @flow

import { is } from "../core/_params";
import { M, L, H, V, Q, T, C, S, A } from "../core/_factories";

import { dispatcher } from "../dispatcher";

export const relDispatcher = dispatcher(
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
    (seg: Seg) => is("M", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      indices: number[],
    ) => M(true, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("L", seg),
    (seg: Seg, index: number, segs: SegList, { x0, y0, x3, y3 }: AbsParams) =>
      L(true, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("H", seg),
    (seg: Seg, index: number, segs: SegList, { x0, y0, x3, y3 }: AbsParams) =>
      H(true, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("V", seg),
    (seg: Seg, index: number, segs: SegList, { x0, y0, x3, y3 }: AbsParams) =>
      V(true, x0, y0, x3, y3),
  ],
  [
    (seg: Seg) => is("Q", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
    ) => Q(true, x0, y0, x1, y1, x3, y3),
  ],
  [
    (seg: Seg) => is("T", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
    ) => T(true, x0, y0, x1, y1, x3, y3),
  ],
  [
    (seg: Seg) => is("C", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
    ) => C(true, x0, y0, x1, y1, x2, y2, x3, y3),
  ],
  [
    (seg: Seg) => is("S", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
    ) => S(true, x0, y0, x1, y1, x2, y2, x3, y3),
  ],
  [
    (seg: Seg) => is("A", seg),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3, rx, ry, angle, large, sweep }: AbsParams,
    ) => A(true, x0, y0, rx, ry, angle, large, sweep, x3, y3),
  ],
);
