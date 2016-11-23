import * as points from './points'
import * as asserts from './is'
import isInside from './is-inside'
import isRelative from './is-relative'
import distance from './distance'
import { min, max } from './min-max'
import toCubic from './to-cubic'

export default {
  ...asserts,
  ...points,
  isInside,
  isRelative,
  distance,
  min,
  max,
  toCubic,
}
