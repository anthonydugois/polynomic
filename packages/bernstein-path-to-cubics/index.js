export default function toCubics(path) {
  return path.reduce(
    (acc, point, index) => {
      const cubic = point.toCubic(index > 0 && path[index - 1])

      if (Array.isArray(cubic)) {
        return [...acc, ...cubic]
      }

      return [...acc, cubic]
    },
    [],
  )
}
