// @flow

import { iterate } from "./core/_iterate";
import { withSegs } from "./from";

function _reduceIter<R>(
  seg: Seg,
  index: number,
  segs: SegList,
  params: AbsParams,
  cache: { acc: R },
  f: Function,
  ...args: mixed[]
): void {
  cache.acc = f(seg, index, segs, params, cache.acc, ...args);
}

function _reduce<R>(f: Function, args: mixed[], initial: R, segs: SegList): R {
  const cache = { acc: initial };

  iterate(_reduceIter, segs, cache, f, ...args);

  return cache.acc;
}

/**
 * Execute the callback once for each segment in the path.
 * The behavior is similar to the native `Array.prototype.reduce` method.
 *
 * This function accepts a function or a dispatcher as a callback.
 *
 * The callback is invoked with at least 5 arguments:
 *
 * - the current segment;
 * - the index of the segment;
 * - the segment list being traversed;
 * - an helper object of absolute values;
 * - the accumulator.
 *
 * The additional arguments provided in the second parameter are also passed to the callback.
 *
 * @example
 * reduce(
 *   (seg, index, segs, params, acc) => acc + getSegParam("x", seg),
 *   [],
 *   0,
 *   "M0 0L10 10L20 20",
 * ); // 30
 *
 * reduce(
 *   (seg, index, segs, params, acc, prop) => acc + getSegParam(prop, seg),
 *   ["x"],
 *   0,
 *   "M0 0L10 10L20 20",
 * ); // 30
 */
export const reduce = withSegs(_reduce);
