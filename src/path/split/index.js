export default function split(path, makeSplit, shouldKeep = "") {
  return path.reduce(
    (acc, point, index) => {
      if (index === 0) {
        return [
          ...acc,
          [point],
        ]
      }

      let shouldSplit = false

      if (typeof makeSplit === "function") {
        shouldSplit = makeSplit(point, index)
      } else if (typeof makeSplit === "string") {
        shouldSplit = point.code === makeSplit
      } else if (Array.isArray(makeSplit)) {
        shouldSplit = makeSplit.includes(point.code)
      }

      if (shouldSplit) {
        if (shouldKeep === "before") {
          const lastPath = [
            ...acc[acc.length - 1],
            point,
          ]

          return [
            ...acc.slice(0, acc.length - 1),
            lastPath,
            [],
          ]
        } else if (shouldKeep === "after") {
          return [
            ...acc,
            [point],
          ]
        }

        return [
          ...acc,
          [],
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
