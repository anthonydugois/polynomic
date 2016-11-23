import parse from '../parse'
import isEqual from '../../path/is-equal'
import isValid from '../is-valid'
import build from './index'

test('should build a pathstring from array of points', () => {
  const path = parse('M0 0l10 10z m0 0L100,56Q10 10 50 60t10,10c10 20 30 40 50 60s400 350 236 241a50,50,0,1,0,50,50Z')

  const test = build(path)
  const expected = path

  expect(isEqual(test, expected)).toBe(true)
})

test('should build a valid pathstring', () => {
  const path = parse('M0 0l10 10z m0 0L100,56Q10 10 50 60t10,10c10 20 30 40 50 60s400 350 236 241a50,50,0,1,0,50,50Z')
  const pathstring = build(path)

  const test = isValid(pathstring)

  expect(test).toBe(true)
})
