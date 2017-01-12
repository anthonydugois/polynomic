// @flow

import { identity } from 'lodash/fp'
import { hydrate } from '../hydrate'

export const path : Function = hydrate(identity, 1)
