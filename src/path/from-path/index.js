/* @flow */

import type { PathT } from "../../types/Path"

import parse from "../../pathstring/parse"

export default function fromPath(
  path: HTMLElement,
): PathT {
  if (path instanceof HTMLElement && path.nodeName.toLowerCase() !== 'path') {
    throw new Error('The element you provided in the `fromPath` function should be a valid SVG path node.')
  }

  const d: string = path.getAttribute('d')

  return parse(d)
}
