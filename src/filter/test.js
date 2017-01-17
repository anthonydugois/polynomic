import { filter } from './index'
import { isM, isL } from '../is'
import { parse } from '../parse'

test('should behave like a normal filter function, but automatically hydrate the resulting path', () => {
  const test = filter(
    (point) => isM(point) || isL(point),
    parse('M0 0L50 50Q100 100 150 150l100 100'),
  )

  expect(test).toEqualPath('M0 0L50 50l200 200')
})
