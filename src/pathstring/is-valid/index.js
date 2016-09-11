import * as points from "../../point/points"
import segments from "../segments"

export default function isValid(d) {
  return checkFirstM(d)
    && checkParametersNumber(d)
    && noInvalidCharacters(d)
}

function checkFirstM(d) {
  return /^m/gi.test(d.trim())
}

function checkParametersNumber(d) {
  return segments(d).every(
    ([code, ...parameters]) =>
      typeof points[code] === "function"
      && parameters.length >= points[code].length
  )
}

function noInvalidCharacters(d) {
  return /^[mlhvqtcsaze\d\s,.-]*$/gi.test(d)
}
