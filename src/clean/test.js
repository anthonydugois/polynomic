import { parse } from '../../pathstring/parse'
import { isEqual } from '../is-equal'
import { clean } from './index'

test('should clean the invalid path', () => {
  const path = parse('L0 0l50 50l0 0h50v50 L0 0')
  const test = clean(path)
  const expected = 'M0 0l50 50h50v50z'

  expect(isEqual(test, expected)).toBe(true)
})
