// @flow

import { getSegType } from "./core/_params";
import { round } from "./core/_maths";
import { withSegs } from "./from";

const rounder = n => round(n, 10e3);

function _renderPathstring(segs: SegList): string {
  let str = "";

  for (const seg of segs) {
    const type = getSegType(seg);
    const [, ...params] = seg;

    str += `${type}${params.map(rounder).join(" ")}`;
  }

  return str;
}

function _renderPathElement(
  path: Element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  ),
  segs: SegList,
): Element {
  path.setAttributeNS(null, "d", _renderPathstring(segs));

  return path;
}

/**
 * Convert a segment list into a pathstring.
 *
 * @example
 * renderPathstring([[2, 0, 0], [4, 10, 10]]); // "M0 0L10 10"
 *
 * renderPathstring(createLine(0, 0, 10, 10)); // "M0 0L10 10"
 *
 * renderPathstring(document.querySelector("line")); // "M0 0L10 10"
 */
export const renderPathstring = withSegs(_renderPathstring);

export const renderPathElement = withSegs(_renderPathElement);
