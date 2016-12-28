// @flow

import { curry } from 'lodash/fp'

export const parseUnit : Function = curry((
  str : string,
) : [number, string] => {
  const res : ?Array<string> = str.match(/([\d.+-]+e?[\d.+-]*)\s*([a-z]*|\%)/i)

  if (res) {
    return [
      parseFloat(res[1]),
      res[2],
    ]
  }

  return [0, '']
})
