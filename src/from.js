// @flow

import { segsDispatcher } from "./dispatchers/segs.dispatcher";

/**
 * Convert the given entity into a standardised segment list. The compatible values are:
 *
 * - a string;
 * - a primitive object;
 * - an SVG element.
 *
 * @example
 * from("M0 0L10 10"); // [[2, 0, 0], [4, 10, 10]]
 *
 * from(createLine(0, 0, 10, 10)); // [[2, 0, 0], [4, 10, 10]]
 *
 * from(document.querySelector("line")); // [[2, 0, 0], [4, 10, 10]]
 */
export function from(entity: SegListLike): SegList {
  return segsDispatcher(entity);
}

export function withSegs<R>(f: (...*[]) => R): (...*[]) => R {
  return (...args) => {
    if (args.length === 0) {
      return f();
    }

    const entity: SegListLike = args.pop(),
      segs = from(entity);

    return f(...args, segs);
  };
}
