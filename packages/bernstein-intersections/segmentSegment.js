export default function segmentSegment(l1a, l1b, l2a, l2b) {
  const d = (l2b.y - l2a.y) * (l1b.x - l1a.x) - (l2b.x - l2a.x) * (l1b.y - l1a.y)

  if (d === 0) {
    return null
  }

  const t = ((l2b.x - l2a.x) * (l1a.y - l2a.y) - (l2b.y - l2a.y) * (l1a.x - l2a.x)) / d
  const u = ((l1b.x - l1a.x) * (l1a.y - l2a.y) - (l1b.y - l1a.y) * (l1a.x - l2a.x)) / d

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {
      x: l1a.x + t * (l1b.x - l1a.x),
      y: l1a.y + t * (l1b.y - l1a.y),
    }
  }

  return null
}
