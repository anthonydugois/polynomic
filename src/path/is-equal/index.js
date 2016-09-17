import _isEqual from "lodash.isequal"
import parse from "../../pathstring/parse"

export default function isEqual(d1, d2) {
  if (typeof d1 === "string") {
    d1 = parse(d1)
  } else if (!Array.isArray(d1)) {
    throw new Error(`The provided parameter "${ d1 }" should be a string or an array of points.`)
  }

  if (typeof d2 === "string") {
    d2 = parse(d2)
  } else if (!Array.isArray(d2)) {
    throw new Error(`The provided parameter "${ d2 }" should be a string or an array of points.`)
  }

  return _isEqual(d1, d2)
}
