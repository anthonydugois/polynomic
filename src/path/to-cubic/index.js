import pointToCubic from "../../point/to-cubic"

export default function toCubic(path) {
  return path.reduce(
    (acc, point, index) => {
      const prev = index > 0 && path[index - 1]
      const cubic = pointToCubic(prev, point)

      return [
        ...acc,
        ...Array.isArray(cubic) ? cubic : [cubic],
      ]
    },
    [],
  )
}
