import fromPath from "../from-path"

const parser = {
  path: fromPath,
}

export default function from(node) {
  const name = node.nodeName.toLowerCase()
  const fn = parser[name]

  if (typeof fn === "undefined") {
    throw new Error("The element you provided in the `from` function is not supported.")
  }

  return fn(node)
}
