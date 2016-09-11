/**
 * Transforms a pathstring in array of segments
 * e.g. segments("M0 0 l50 50 q100 100 150 150z")
 * --> [["M", 0, 0], ["l", 50, 50], ["q", 100, 100, 150, 150], ["z"]]
 */
export default function segments(d) {
  return d
    // remove invalid characters
    .replace(/[^mlhvqtcsaze\d\s,.-]/gi, "")
    // split in segments e.g. ["M0 0", "l50 50", ...]
    .split(/([mlhvqtcsaz][e\d\s,.-]*)/i)
    // remove empty segments
    .filter(isStringNotEmpty)
    // split segment by path values
    .map(splitSegment)
}

function isStringNotEmpty(str) {
  return str.trim().length > 0
}

function convertNumberLikeInActualNumber(str) {
  str = str.trim()
  return isNaN(str) ? str : parseFloat(str)
}

function splitSegment(segment) {
  return segment
    // remove extra whitespaces
    .replace(/[\s,]+/g, " ")
    // split command and parameters
    .split(/([mlhvqtcsaz]|-*[e\d.-]+)/i)
    // remove empty values
    .filter(isStringNotEmpty)
    // trim and parse numbers
    .map(convertNumberLikeInActualNumber)
}
