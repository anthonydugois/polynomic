// @flow

import type { PathT } from '../types'

import { fromPath } from './path'
import { fromLine } from './line'
import { fromPolyline } from './polyline'
import { fromPolygon } from './polygon'
import { fromRect } from './rect'
import { fromCircle } from './circle'
import { fromEllipse } from './ellipse'

const parser = {
  path: fromPath,
  line: fromLine,
  polyline: fromPolyline,
  polygon: fromPolygon,
  rect: fromRect,
  circle: fromCircle,
  ellipse: fromEllipse,
}

export function from(
  node: HTMLElement,
): PathT {
  const name: string = node.nodeName.toLowerCase()
  const fn: Function = parser[name]

  if (typeof fn === 'undefined') {
    throw new Error('The element you provided in the `from` function is not supported.')
  }

  return fn(node)
}
