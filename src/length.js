// @flow

import { lengthDispatcher } from "./dispatchers/length.dispatcher";
import { reduce } from "./reduce";

export function length(resolution: number, entity: SegListLike): number {
  return reduce(lengthDispatcher, [resolution], 0, entity);
}
