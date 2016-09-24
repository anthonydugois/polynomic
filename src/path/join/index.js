export default function join(paths, makeJoin = () => []) {
  return paths.reduce(
    (acc, path, index) => {
      if (index >= paths.length - 1) {
        return [
          ...acc,
          ...path,
        ]
      }

      const prevPath = path
      const nextPath = paths[index + 1]
      const segment = makeJoin(prevPath, nextPath)

      return [
        ...acc,
        ...path,
        ...Array.isArray(segment) ? segment : [segment],
      ]
    },
    [],
  )
}
