export default function isInside(point, path) {
  let inside = false

  for (let i = 0, j = path.length - 1 ; i < path.length ; i++) {
    const current = path[i]
    const previous = path[j]
    const slope = (previous.y - current.y) / (previous.x - current.x)
    const isVerticallyBetween = (current.y > point.y !== previous.y > point.y)
    const isHorizontallyBefore = point.x < current.x + (point.y - current.y) / slope

    if (isVerticallyBetween && isHorizontallyBefore) {
      inside = !inside
    }

    j = i
  }

  return inside
}
