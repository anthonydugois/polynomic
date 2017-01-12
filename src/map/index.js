// @flow

import { map as _map } from 'lodash/fp'
import { hydrate } from '../hydrate'

export const map : Function = hydrate(_map.convert({ cap: false }), 2)
