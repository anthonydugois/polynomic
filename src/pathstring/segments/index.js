/* @flow */

export default function segments(
  d: string,
): Array<Array<string | number>> {
  return d
    .replace(/[^mlhvqtcsaze\d\s,.+-]/gi, '')
    .split(/([mlhvqtcsaz][e\d\s,.+-]*)/i)
    .filter(isStringNotEmpty)
    .map(splitSegment)
}

function isStringNotEmpty(
  str: string,
): boolean {
  return str.trim().length > 0
}

function convertNumberLikeInActualNumber(
  str: string,
): string | number {
  const trimmed = str.trim()

  return isNaN(trimmed) ?
    trimmed :
    parseFloat(trimmed)
}

function splitSegment(
  segment: string,
): Array<string | number> {
  return segment
    .replace(/[\s,]+/g, ' ')
    .split(/([mlhvqtcsaz]|(?:-|\+)*[\d.]*(?:e(?:-|\+)*[\d.]*)?)/i)
    .filter(isStringNotEmpty)
    .map(convertNumberLikeInActualNumber)
}
