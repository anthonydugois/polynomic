import { combine } from './index'
import { parse } from '../parse'

test('should combine compound path', function () {
  const test = combine(parse('M0 0h50v50z m100 100h100v100z'))

  expect(test).toEqualPath('M0 0h50v50 l50 50h100v100z')
})
