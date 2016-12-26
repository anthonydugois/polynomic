import { isEqual } from './is-equal'

expect.extend({
  toEqualCloseTo(received, expected, precision = 3) {
    const { getType } = this.utils

    function round(obj) {
      switch (getType(obj)) {
      case 'array':
        return obj.map(round)

      case 'object':
        return Object.keys(obj).reduce((acc, key) => {
          acc[key] = round(obj[key])
          return acc
        }, {})

      case 'number':
        return +obj.toFixed(precision)

      default:
        return obj
      }
    }

    expect(round(received)).toEqual(expected)

    return { pass: true }
  },
  toEqualPath(received, expected, precision = 3) {
    expect(isEqual(received, expected, precision)).toBe(true)

    return { pass: true }
  },
})
