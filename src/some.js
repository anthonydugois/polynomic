// @flow

import { iterate } from "./core/_iterate";
import { withSegs } from "./from";

function _someIter(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  f: Function,
  ...args: mixed[]
): ?boolean {
  if (f(seg, index, segs, params, ...args)) {
    return true;
  }
}

function _some(f: Function, args: mixed[], segs: SegList): boolean {
  return iterate(_someIter, segs, f, ...args) === true ? true : false;
}

export const some = withSegs(_some);
