// @flow

import { iterate } from "./core/_iterate";
import { withSegs } from "./from";

function _everyIter(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  f: Function,
  ...args: mixed[]
): ?boolean {
  if (!f(seg, index, segs, params, ...args)) {
    return false;
  }
}

function _every(f: Function, args: mixed[], segs: SegList): boolean {
  return iterate(_everyIter, segs, f, ...args) === false ? false : true;
}

export const every = withSegs(_every);
