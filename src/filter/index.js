// @flow

import { filter as _filter } from 'lodash/fp'
import { hydrate } from '../hydrate'

export const filter : Function = hydrate(_filter.convert({ cap: false }))
