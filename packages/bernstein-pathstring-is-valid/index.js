import * as points from "bernstein-point"
import { getSegments } from "bernstein-parse-pathstring"

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
  return /^[mlhvqtcsaz\d\s,-]*$/gi.test(d)
}
