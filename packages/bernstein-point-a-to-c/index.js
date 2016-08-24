import rotate from "bernstein-rotate-path"
import Point, { C, c } from "bernstein-point"

export default function arcToCubic(prev, point, center = null) {
  let partial = []
  let cx, cy, f1, f2

  let x1 = prev.x
  let y1 = prev.y
  let x2 = point.x
  let y2 = point.y
  let rx = point.parameters.rx
  let ry = point.parameters.ry

  const pi2_3 = (2 * Math.PI) / 3
  const angle = (Math.PI / 180) * point.parameters.rotation

  if (center) {
    cx = center[0]
    cy = center[1]
    f1 = center[2]
    f2 = center[3]
  } else {
    const _prev = rotate([prev], -angle)[0]
    const _point = rotate([point], -angle)[0]

    x1 = _prev.x
    y1 = _prev.y
    x2 = _point.x
    y2 = _point.y

    const x = (x1 - x2) / 2
    const y = (y1 - y2) / 2
    const sqX = Math.pow(x, 2)
    const sqY = Math.pow(y, 2)

    let sqRx = Math.pow(rx, 2)
    let sqRy = Math.pow(ry, 2)
    let ellipse = (sqX / sqRx) + (sqY / sqRy)

    if (ellipse > 1) {
      ellipse = Math.sqrt(ellipse)
      rx *= ellipse
      ry *= ellipse
    }

    sqRx = Math.pow(rx, 2)
    sqRy = Math.pow(ry, 2)

    const sign = point.parameters.large === point.parameters.sweep ? -1 : 1
    const k = sign * Math.sqrt(Math.abs(((sqRx * sqRy) - (sqRx * sqY) - (sqRy * sqX)) / ((sqRx * sqY) + (sqRy * sqX))))

    cx = ((k * rx * y) / ry) + ((x1 + x2) / 2)
    cy = ((k * -ry * x) / rx) + ((y1 + y2) / 2)

    f1 = Math.asin((y1 - cy) / ry)
    f2 = Math.asin((y2 - cy) / ry)

    if (x1 < cx) {
      f1 = Math.PI - f1
    }

    if (f1 < 0) {
      f1 += 2 * Math.PI
    }

    if (x2 < cx) {
      f2 = Math.PI - f2
    }

    if (f2 < 0) {
      f2 += 2 * Math.PI
    }

    if (point.parameters.sweep === 1 && f1 > f2) {
      f1 -= 2 * Math.PI
    }

    if (point.parameters.sweep === 0 && f2 > f1) {
      f2 -= 2 * Math.PI
    }
  }

  if (Math.abs(f2 - f1) > pi2_3) {
    const _f2 = f2
    const _point = new Point(point.code, x2, y2, point.parameters)

    f2 = f1 + (pi2_3 * (point.parameters.sweep === 1 && f2 > f1 ? 1 : -1))
    x2 = cx + (rx * Math.cos(f2))
    y2 = cy + (ry * Math.sin(f2))

    const _prev = new Point(prev.code, x2, y2, prev.parameters)

    partial = arcToCubic(_prev, _point, [cx, cy, f2, _f2])
  }

  const t = Math.tan((f2 - f1) / 4)
  const hx = (4 / 3) * rx * t
  const hy = (4 / 3) * ry * t

  const p1 = [x1, y1]
  const p2 = [x1 + (hx * Math.sin(f1)), y1 - (hy * Math.cos(f1))]
  const p3 = [x2 + (hx * Math.sin(f2)), y2 - (hy * Math.cos(f2))]
  const p4 = [x2, y2]

  p2[0] = (2 * p1[0]) - p2[0]
  p2[1] = (2 * p1[1]) - p2[1]

  const cubic = point.isRelative() ?
    c(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]) :
    C(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1])

  if (center) {
    return [cubic, ...partial]
  }

  return rotate([cubic, ...partial], angle)
}
