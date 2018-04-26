// @flow

import { iterate } from "./core/_iterate";
import { withSegs } from "./from";

function _filterIter(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  list: SegList,
  f: Function,
  ...args: mixed[]
): void {
  if (f(seg, index, segs, params, ...args)) {
    list.push(seg);
  }
}

function _filter(f: Function, args: mixed[], segs: SegList): SegList {
  const list = [];

  iterate(_filterIter, segs, list, f, ...args);

  return list;
}

/**
 * Create a new path with the segments for which the callback returns a value that coerces to `true`.
 * The behavior is similar to the native `Array.prototype.filter` method.
 *
 * This function accepts a function or a dispatcher as a callback.
 *
 * The callback is invoked with at least 4 arguments:
 *
 * - the current segment;
 * - the index of the segment;
 * - the segment list being traversed;
 * - an helper object of absolute values.
 *
 * The additional arguments provided in the second parameter are also passed to the callback.
 *
 * @example
 * filter(
 *   seg => getSegParam("x", seg) >= 0,
 *   [],
 *   "M0 0L-10 10L10 10",
 * ); // [[2, 0, 0], [4, 10, 10]]
 *
 * filter(
 *   (seg, index, segs, params, prop) => getSegParam(prop, seg) >= 0,
 *   ["x"],
 *   "M0 0L-10 10L10 10",
 * ); // [[2, 0, 0], [4, 10, 10]]
 */
export const filter = withSegs(_filter);
