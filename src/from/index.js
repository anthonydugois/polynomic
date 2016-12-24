// @flow

import type {
  PathT,
  CircleT,
  EllipseT,
  LineT,
  RectT,
} from '../types'

import { path } from '../path'
import { parse, parseSegments } from '../parse'
import { M, L, A, Z } from '../points'

export function from(
  primitive : any | HTMLElement,
) : PathT {
  const name : string = primitive instanceof HTMLElement ?
    primitive.nodeName.toLowerCase() :
    primitive.type.toLowerCase()

  switch (name) {
  case 'line':
    return fromLine(primitive)

  case 'polyline':
    return fromPolyline(primitive)

  case 'polygon':
    return fromPolygon(primitive)

  case 'rect':
    return fromRect(primitive)

  case 'circle':
    return fromCircle(primitive)

  case 'ellipse':
    return fromEllipse(primitive)

  case 'path':
    return fromPath(primitive)

  default:
    throw new Error('The element you provided in the `from` function is not supported.')
  }
}

export function fromLine(
  line : LineT | HTMLElement,
) : PathT {
  if (line instanceof HTMLElement && line.nodeName.toLowerCase() !== 'line') {
    throw new Error('The element you provided in the `fromLine` function should be a valid SVG line node.')
  }

  const x1 : number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('x1')) :
    line.x1

  const y1 : number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('y1')) :
    line.y1

  const x2 : number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('x2')) :
    line.x2

  const y2 : number = line instanceof HTMLElement ?
    parseFloat(line.getAttribute('y2')) :
    line.y2

  return path(
    M(x1, y1),
    L(x2, y2),
  )
}

export function fromRect(
  rect : RectT | HTMLElement,
) : PathT {
  if (rect instanceof HTMLElement && rect.nodeName.toLowerCase() !== 'rect') {
    throw new Error('The element you provided in the `fromRect` function should be a valid SVG rect node.')
  }

  const x : number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('x')) :
    rect.x

  const y : number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('y')) :
    rect.y

  const width : number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('width')) :
    rect.width

  const height : number = rect instanceof HTMLElement ?
    parseFloat(rect.getAttribute('height')) :
    rect.height

  const _rx : number = parseFloat(
    rect instanceof HTMLElement ?
      rect.getAttribute('rx') :
      rect.rx
  )

  const _ry : number = parseFloat(
    rect instanceof HTMLElement ?
      rect.getAttribute('ry') :
      rect.ry
  )

  const noRadius : boolean = (isNaN(_rx) && isNaN(_ry))
    || _rx === 0
    || _ry === 0

  if (noRadius) {
    return path(
      M(x, y),
      L(x + width, y),
      L(x + width, y + height),
      L(x, y + height),
      Z(),
    )
  }

  const rx : number = isNaN(_rx) ? _ry : _rx
  const ry : number = isNaN(_ry) ? _rx : _ry

  return path(
    M(x + rx, y),
    L((x + width) - rx, y),
    A(rx, ry, 0, 0, 1, x + width, y + ry),
    L(x + width, (y + height) - ry),
    A(rx, ry, 0, 0, 1, (x + width) - rx, y + height),
    L(x + rx, y + height),
    A(rx, ry, 0, 0, 1, x, (y + height) - ry),
    L(x, y + ry),
    A(rx, ry, 0, 0, 1, x + rx, y),
    Z(),
  )
}

export function fromCircle(
  circle : CircleT | HTMLElement,
): PathT {
  if (circle instanceof HTMLElement && circle.nodeName.toLowerCase() !== 'circle') {
    throw new Error('The element you provided in the `fromCircle` function should be a valid SVG circle node.')
  }

  const cx : number = circle instanceof HTMLElement ?
    parseFloat(circle.getAttribute('cx')) :
    circle.cx

  const cy : number = circle instanceof HTMLElement ?
    parseFloat(circle.getAttribute('cy')) :
    circle.cy

  const r : number = circle instanceof HTMLElement ?
    parseFloat(circle.getAttribute('r')) :
    circle.r

  return path(
    M(cx - r, cy),
    A(r, r, 0, 0, 0, cx + r, cy),
    A(r, r, 0, 0, 0, cx - r, cy),
    Z(),
  )
}

export function fromEllipse(
  ellipse : EllipseT | HTMLElement,
) : PathT {
  if (ellipse instanceof HTMLElement && ellipse.nodeName.toLowerCase() !== 'ellipse') {
    throw new Error('The element you provided in the `fromEllipse` function should be a valid SVG ellipse node.')
  }

  const cx : number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('cx')) :
    ellipse.cx

  const cy : number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('cy')) :
    ellipse.cy

  const rx : number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('rx')) :
    ellipse.rx

  const ry : number = ellipse instanceof HTMLElement ?
    parseFloat(ellipse.getAttribute('ry')) :
    ellipse.ry

  return path(
    M(cx - rx, cy),
    A(rx, ry, 0, 0, 0, cx + rx, cy),
    A(rx, ry, 0, 0, 0, cx - rx, cy),
    Z(),
  )
}

export function fromPolygon(
  polygon : HTMLElement,
) : PathT {
  if (polygon instanceof HTMLElement && polygon.nodeName.toLowerCase() !== 'polygon') {
    throw new Error('The element you provided in the `fromPolygon` function should be a valid SVG polygon node.')
  }

  const points : string = polygon.getAttribute('points')
  const coords : Array<string | number> = parseSegments(points)[0]

  return coords.reduce(
    (
      acc : PathT,
      coord : string | number,
      index : number,
    ): PathT => {
      if (index > 0 && index === coords.length - 1) {
        acc.push(Z()(acc[0]))
      } else if (index % 2 === 0) {
        const x : number = parseFloat(coord)
        const y : number = parseFloat(coords[index + 1])
        const cmd : Function = index === 0 ? M : L

        acc.push(cmd(x, y)())
      }

      return acc
    },
    [],
  )
}

export function fromPolyline(
  polyline : HTMLElement,
) : PathT {
  if (polyline instanceof HTMLElement && polyline.nodeName.toLowerCase() !== 'polyline') {
    throw new Error('The element you provided in the `fromPolyline` function should be a valid SVG polyline node.')
  }

  const points : string = polyline.getAttribute('points')
  const coords : Array<string | number> = parseSegments(points)[0]

  return coords.reduce(
    (
      acc : PathT,
      coord : string | number,
      index : number,
    ): PathT => {
      if (index % 2 === 0) {
        const x : number = parseFloat(coord)
        const y : number = parseFloat(coords[index + 1])
        const cmd : Function = index === 0 ? M : L

        acc.push(cmd(x, y)())
      }

      return acc
    },
    [],
  )
}

export function fromPath(
  path : HTMLElement,
) : PathT {
  if (path instanceof HTMLElement && path.nodeName.toLowerCase() !== 'path') {
    throw new Error('The element you provided in the `fromPath` function should be a valid SVG path node.')
  }

  const d : string = path.getAttribute('d')

  return parse(d)
}
