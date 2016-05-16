export default function toCubics(path) {
  return path.reduce(
    (acc, point, i) => {
      const cubic = point.toCubic(i > 0 && path[i - 1])

      if (Array.isArray(cubic)) {
        return [...acc, ...cubic]
      }

      return [...acc, cubic]
    },
    []
  )
}
