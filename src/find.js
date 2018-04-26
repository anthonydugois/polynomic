// @flow

import { iterate } from "./core/_iterate";
import { withSegs } from "./from";

function _findIter(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  f: Function,
  ...args: mixed[]
): ?Seg {
  if (f(seg, index, segs, params, ...args)) {
    return seg;
  }
}

function _findIndexIter(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  f: Function,
  ...args: mixed[]
): ?number {
  if (f(seg, index, segs, params, ...args)) {
    return index;
  }
}

function _find(f: Function, args: mixed[], segs: SegList): ?Seg {
  return iterate(_findIter, segs, f, ...args);
}

function _findIndex(f: Function, args: mixed[], segs: SegList): number {
  return iterate(_findIndexIter, segs, f, ...args) || -1;
}

export const find = withSegs(_find);

export const findIndex = withSegs(_findIndex);
