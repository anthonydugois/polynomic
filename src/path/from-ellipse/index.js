/* @flow */

import type { PathT } from "../../types/Path"
import type { EllipseT } from "../../types/Ellipse"

import { path } from "../path"
import { M, A, Z } from "../../point/points"

export default function fromEllipse(
  ellipse: EllipseT | HTMLElement,
): PathT {
  if (ellipse instanceof HTMLElement && ellipse.nodeName.toLowerCase() !== 'ellipse') {
    throw new Error('The element you provided in the `fromEllipse` function should be a valid SVG ellipse node.')
  }

  const cx: number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('cx')) :
    ellipse.cx

  const cy: number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('cy')) :
    ellipse.cy

  const rx: number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('rx')) :
    ellipse.rx

  const ry: number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('ry')) :
    ellipse.ry

  return path(
    M(cx - rx, cy),
    A(rx, ry, 0, 0, 0, cx + rx, cy),
    A(rx, ry, 0, 0, 0, cx - rx, cy),
    Z(),
  )
}
