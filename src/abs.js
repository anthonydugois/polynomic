// @flow

import { absDispatcher } from "./dispatchers/abs.dispatcher";
import { map } from "./map";

/**
 * Convert path segments into their absolute equivalent.
 *
 * The first parameter is a list of indices to process only a subset of the path.
 * The entire path is processed if this list is empty.
 *
 * @example
 * abs(undefined, "m0 0l10 10l10 10"); // [[2, 0, 0], [4, 10, 10], [4, 20, 20]]
 *
 * abs([1], "m0 0l10 10l10 10"); // [[3, 0, 0], [4, 10, 10], [5, 10, 10]]
 */
export function abs(indices: number[], entity: SegListLike): SegList {
  return map(absDispatcher, [indices], entity);
}
