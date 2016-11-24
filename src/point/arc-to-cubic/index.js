import { point } from '../index'
import { isRelative } from '../is-relative'
import { transform } from '../../transforms'
import { rotate } from '../../transforms/rotate'

export function arcToCubic(previous, current, center = null) {
  let partial = []
  let cx, cy, f1, f2

  let x1 = previous.x
  let y1 = previous.y
  let x2 = current.x
  let y2 = current.y
  let rx = current.parameters.rx
  let ry = current.parameters.ry

  const pi2_3 = (2 * Math.PI) / 3
  const angle = (Math.PI / 180) * current.parameters.rotation

  if (center) {
    cx = center[0]
    cy = center[1]
    f1 = center[2]
    f2 = center[3]
  } else {
    const rotation = rotate(-angle)
    const _previous = transform(rotation)([previous])[0]
    const _current = transform(rotation)([current])[0]

    x1 = _previous.x
    y1 = _previous.y
    x2 = _current.x
    y2 = _current.y

    const x = (x1 - x2) / 2
    const y = (y1 - y2) / 2
    const sqX = x ** 2
    const sqY = y ** 2

    let sqRx = rx ** 2
    let sqRy = ry ** 2
    let ellipse = (sqX / sqRx) + (sqY / sqRy)

    if (ellipse > 1) {
      ellipse = Math.sqrt(ellipse)
      rx *= ellipse
      ry *= ellipse
    }

    sqRx = rx ** 2
    sqRy = ry ** 2

    const sign = current.parameters.large === current.parameters.sweep ? -1 : 1
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

    if (current.parameters.sweep === 1 && f1 > f2) {
      f1 -= 2 * Math.PI
    }

    if (current.parameters.sweep === 0 && f2 > f1) {
      f2 -= 2 * Math.PI
    }
  }

  if (Math.abs(f2 - f1) > pi2_3) {
    const _f2 = f2
    const _current = point(current.code, x2, y2, current.parameters)

    f2 = f1 + (pi2_3 * (current.parameters.sweep === 1 && f2 > f1 ? 1 : -1))
    x2 = cx + (rx * Math.cos(f2))
    y2 = cy + (ry * Math.sin(f2))

    const _previous = point(previous.code, x2, y2, previous.parameters)

    partial = arcToCubic(_previous, _current, [cx, cy, f2, _f2])
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

  const cubic = point(
    isRelative(current) ? 'c' : 'C',
    p4[0],
    p4[1],
    { x1: p2[0], y1: p2[1], x2: p3[0], y2: p3[1] },
  )

  const path = [
    cubic,
    ...partial,
  ]

  if (center) {
    return path
  }

  return transform(rotate(angle))(path)
}
