export default function split(path, codes, shouldKeep = false) {
  if (!Array.isArray(codes)) {
    codes = [codes]
  }

  return path.reduce(
    (acc, point, index) => {
      if (codes.indexOf(point.code) >= 0) {
        return [
          ...acc,
          shouldKeep ? [point] : [],
        ]
      } else if (index === 0) {
        return [
          ...acc,
          [point],
        ]
      }

      acc[acc.length - 1].push(point)

      return acc
    },
    [],
  )
}
