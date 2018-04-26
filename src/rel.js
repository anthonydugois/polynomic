// @flow

import { relDispatcher } from "./dispatchers/rel.dispatcher";
import { map } from "./map";

/**
 * Convert path segments into their relative equivalent.
 *
 * The first parameter is a list of indices to process only a subset of the path.
 * The entire path is processed if this list is empty.
 *
 * @example
 * rel(undefined, "M0 0L10 10L20 20"); // [[3, 0, 0], [5, 10, 10], [5, 10, 10]]
 *
 * rel([1], "M0 0L10 10L20 20"); // [[2, 0, 0], [5, 10, 10], [4, 20, 20]]
 */
export function rel(indices: number[], entity: SegListLike): SegList {
  return map(relDispatcher, [indices], entity);
}
