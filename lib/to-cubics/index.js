import toCubic from "lib/point/to-cubic"

export default function toCubics(path) {
  return path.reduce(
    (acc, point, index) => {
      const prev = index > 0 && path[index - 1]
      const cubic = toCubic(prev, point)

      if (Array.isArray(cubic)) {
        return [...acc, ...cubic]
      }

      return [...acc, cubic]
    },
    [],
  )
}
