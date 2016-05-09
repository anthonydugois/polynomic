import deepEqual from "deep-equal"
import parsePathstring from "bernstein-parse-pathstring"

export default function isEqual(d1, d2) {
  if (typeof d1 === "string" && typeof d2 === "string") {
    return deepEqual(parsePathstring(d1), parsePathstring(d2))
  } else if (Array.isArray(d1) && Array.isArray(d2)) {
    return deepEqual(d1, d2)
  } else if (typeof d1 === "string" && Array.isArray(d2)) {
    return deepEqual(parsePathstring(d1), d2)
  } else if (Array.isArray(d1) && typeof d2 === "string") {
    return deepEqual(d1, parsePathstring(d2))
  }

  throw new Error("isEqual() only accepts strings and arrays as parameters.")
}
