function addToLastPath(paths, point) {
  const lastPathIndex = paths.length - 1
  const lastPath = paths[lastPathIndex]

  return [
    ...paths.slice(0, lastPathIndex),
    [...lastPath, point],
  ]
}

function addNewPath(paths) {
  return [
    ...paths,
    [],
  ]
}

export default function split(path, shouldSplit, shouldKeep = "") {
  return path.reduce(
    (paths, point, index) => {
      if (index === 0) {
        return addToLastPath(addNewPath(paths), point)
      }

      if (shouldSplit(point, index)) {
        switch (shouldKeep) {
        case "before":
          return addNewPath(addToLastPath(paths, point))

        case "after":
          return addToLastPath(addNewPath(paths), point)

        default:
          return addNewPath(paths)
        }
      }

      return addToLastPath(paths, point)
    },
    [],
  )
}
