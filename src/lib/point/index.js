import Point, * as points from "lib/point/points"
import is, * as asserts from "lib/point/is"
import isInside from "lib/point/isInside"
import isRelative from "lib/point/isRelative"
import distance from "lib/point/distance"
import { min, max } from "lib/point/min-max"
import lineToCubic from "lib/point/line-to-cubic"
import quadraticToCubic from "lib/point/quadratic-to-cubic"
import arcToCubic from "lib/point/arc-to-cubic"
import toCubic from "lib/point/toCubic"

export default {
  Point,
  is,
  isInside,
  isRelative,
  distance,
  min,
  max,
  lineToCubic,
  quadraticToCubic,
  arcToCubic,
  toCubic,
  ...asserts,
  ...points,
}
