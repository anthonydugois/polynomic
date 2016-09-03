import Point, * as points from "lib/point/points"
import is, * as asserts from "lib/point/is"
import isInside from "lib/point/is-inside"
import isRelative from "lib/point/is-relative"
import distance from "lib/point/distance"
import { min, max } from "lib/point/min-max"
import toCubic from "lib/point/to-cubic"

export default {
  Point,
  is,
  isInside,
  isRelative,
  distance,
  min,
  max,
  toCubic,
  ...asserts,
  ...points,
}
