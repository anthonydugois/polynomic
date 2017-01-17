// @flow

import { reduce as _reduce } from 'lodash/fp'
import { hydrate } from '../hydrate'

export const reduce : Function = hydrate(_reduce.convert({ cap: false }))
