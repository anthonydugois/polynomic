import deepEqual from "deep-equal"
import parse from "lib/pathstring/parse"

export default function isEqual(d1, d2) {
  if (typeof d1 === "string" && typeof d2 === "string") {
    return deepEqual(parse(d1), parse(d2))
  } else if (Array.isArray(d1) && Array.isArray(d2)) {
    return deepEqual(d1, d2)
  } else if (typeof d1 === "string" && Array.isArray(d2)) {
    return deepEqual(parse(d1), d2)
  } else if (Array.isArray(d1) && typeof d2 === "string") {
    return deepEqual(d1, parse(d2))
  }

  throw new Error("isEqual() only accepts strings and arrays as parameters.")
}
