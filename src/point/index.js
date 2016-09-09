import Point, * as points from "point/points"
import is, * as asserts from "point/is"
import isInside from "point/is-inside"
import isRelative from "point/is-relative"
import distance from "point/distance"
import { min, max } from "point/min-max"
import toCubic from "point/to-cubic"

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
