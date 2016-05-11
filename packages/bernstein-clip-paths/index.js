import Point, { L } from "bernstein-point"
import { isM, isZ } from "bernstein-point-is"
import isInside from "bernstein-point-is-inside"
import clean from "bernstein-clean-path"
import combine from "bernstein-combine-path"

const isIntersection = (p) => typeof p.corresponding !== "undefined"
const isNonVisitedIntersection = (p) => isIntersection(p) && !p.isVisited

export default function clip(_s, _c, sForwards = true, cForwards = true) {
  const [s, c] = getIntersectedPaths(_s, _c, sForwards, cForwards)
  const clipped = []

  let index

  // step 3
  // generate the resulting path
  while ((index = s.findIndex(isNonVisitedIntersection)) > -1) {
    // begins with an intersection
    let current = s[index]
    let [sourcePath, clipPath] = [s, c]

    const clippedShape = [Point(
      current.code,
      current.x,
      current.y,
      current.parameters
    )]

    while (!current.isVisited) {
      sourcePath[index].isVisited = true
      clipPath[sourcePath[index].corresponding].isVisited = true

      // find the next intersection
      if (current.isEntry) {
        do {
          index = index < sourcePath.length - 1 ? index + 1 : 0
          current = sourcePath[index]
          clippedShape.push(Point(
            current.code,
            current.x,
            current.y,
            current.parameters
          ))
        } while (!isIntersection(current))
      } else {
        do {
          index = index > 0 ? index - 1 : sourcePath.length - 1
          current = sourcePath[index]
          clippedShape.push(Point(
            current.code,
            current.x,
            current.y,
            current.parameters
          ))
        } while (!isIntersection(current))
      }

      // switch path
      [sourcePath, clipPath] = [clipPath, sourcePath]
      index = current.corresponding
      current = sourcePath[index]
    }

    clipped.push(clippedShape)
  }

  if (clipped.length === 0) {
    if (isInside(_s[0], _c)) {
      clipped.push(..._s)
    }

    if (isInside(_c[0], _s)) {
      clipped.push(..._c)
    }
  }

  return clipped
}

export function getIntersectedPaths(s, c, sForwards, cForwards) {
  sForwards ^= isInside(s[0], c)
  cForwards ^= isInside(c[0], s)

  for (let i = 0 ; i < s.length ; i++) {
    const sPoint = s[i]
    const sNext = i < s.length - 1 ? s[i + 1] : s[0]

    console.log("Segment source ", i)

    if (/*!isIntersection(sPoint)*/true) {
      for (let j = 0 ; j < c.length ; j++) {
        const cPoint = c[j]
        const cNext = j < c.length - 1 ? c[j + 1] : c[0]

        console.log("Segment clip", j)

        console.log(sPoint, sNext, cPoint, cNext)

        if (/*!isIntersection(cPoint)*/true) {
          const inter = getIntersectionPoint(sPoint, sNext, cPoint, cNext)

          if (inter !== false) {
            const sIndex = ++i
            const sInter = L(inter.x, inter.y)

            console.log(sIndex, sInter)

            const cIndex = ++j
            const cInter = L(inter.x, inter.y)

            // step 1
            // add intersections in each path
            sInter.corresponding = cIndex
            cInter.corresponding = sIndex

            sInter.isVisited = false
            cInter.isVisited = false

            // step 2
            // mark each intersection as entry or exit
            sInter.isEntry = !!sForwards
            sForwards = !sForwards

            cInter.isEntry = !!cForwards
            cForwards = !cForwards

            s.splice(sIndex, 0, sInter)
            c.splice(cIndex, 0, cInter)
          }
        }
      }
    }
  }

  return [s, c]
}

export function getIntersectionPoint(p1, p2, p3, p4) {
  const d = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y)

  if (d === 0) {
    return false
  }

  const a = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / d
  const b = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / d

  if (a > 0 && a < 1 && b > 0 && b < 1) {
    return {
      x: p1.x + a * (p2.x - p1.x),
      y: p1.y + a * (p2.y - p1.y),
    }
  }

  return false
}
