// @flow

import { clamp } from "./core/_maths";
import { divideDispatcher } from "./dispatchers/divide.dispatcher";
import { reduce } from "./reduce";

/**
 * Divide each segment of the path into a given number of sub-segments.
 * The sub-segments are of the same type as the initial segment and the appearance of the path is not altered.
 *
 * The second parameter is a list of indices to process only a subset of the path.
 * The entire path is processed if this list is empty.
 *
 * @example
 * // Divide all segments in 2
 * divide(2, [], "M0 0L10 10L20 20"); // [[2, 0, 0], [4, 5, 5], [4, 10, 10], [4, 15, 15], [4, 20, 20]]
 *
 * // Divide the second segment in 2
 * divide(2, [1], "M0 0L10 10L20 20"); // [[2, 0, 0], [4, 5, 5], [4, 10, 10], [4, 20, 20]]
 */
export function divide(
  count: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return reduce(
    divideDispatcher,
    [clamp(1, Infinity, count), indices],
    [],
    entity,
  );
}
