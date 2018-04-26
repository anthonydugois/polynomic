// @flow

import { iterate } from "./core/_iterate";
import { withSegs } from "./from";

function _mapIter<R>(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  list: R[],
  f: Function,
  ...args: mixed[]
): void {
  list.push(f(seg, index, segs, params, ...args));
}

function _map<R>(f: Function, args: mixed[], segs: SegList): R[] {
  const list = [];

  iterate(_mapIter, segs, list, f, ...args);

  return list;
}

/**
 * Create a new array with the results of calling a provided callback on every segment in the path.
 * The behavior is similar to the native `Array.prototype.map` method.
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
 * map(
 *   seg => getSegParam("x", seg),
 *   [],
 *   "M0 0L10 10",
 * ); // [0, 10]
 *
 * map(
 *   (seg, index, segs, params, prop) => getSegParam(prop, seg),
 *   ["x"],
 *   "M0 0L10 10",
 * ); // [0, 10]
 */
export const map = withSegs(_map);
