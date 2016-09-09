export default function split(path, separators, shouldKeep = false) {
  if (!Array.isArray(separators)) {
    separators = [separators]
  }

  return path.reduce(
    (acc, point, index) => {
      if (separators.includes(point.code) || index === 0) {
        return [
          ...acc,
          (shouldKeep || index === 0) ? [point] : [],
        ]
      }

      const subpath = [
        ...acc[acc.length - 1],
        point,
      ]

      return [
        ...acc.slice(0, acc.length - 1),
        subpath,
      ]
    },
    [],
  )
}
