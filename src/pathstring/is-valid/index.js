import * as points from "../../point/points"
import { getSegments } from "../parse"

export default function isValid(d) {
  return checkFirstM(d)
    && checkParametersNumber(d)
    && noInvalidCharacters(d)
}

function checkFirstM(d) {
  return /^m/gi.test(d.trim())
}

function checkParametersNumber(d) {
  return getSegments(d).every(
    ([code, ...parameters]) =>
      typeof points[code] === "function"
      && parameters.length >= points[code].length
  )
}

function noInvalidCharacters(d) {
  return /^[mlhvqtcsaz\d\s,.-]*$/gi.test(d)
}
