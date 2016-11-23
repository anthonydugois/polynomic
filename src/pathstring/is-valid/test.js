import isValid from './index'

test('should check that pathstrings are valid', () => {
  expect(isValid('M0,0')).toBe(true)
  expect(isValid('M0,0l0 0')).toBe(true)
  expect(isValid('M0,0l0 0a+50 50, 0,1,0 -10 10')).toBe(true)
})

test('should check that there is a missing M point', () => {
  expect(isValid('l10,10')).toBe(false)
})

test('should check that there is not the correct number of parameters', () => {
  expect(isValid('M0')).toBe(false)
  expect(isValid('q10 20,30')).toBe(false)
})

test('should check that there are invalid characters', () => {
  expect(isValid('M/10__10')).toBe(false)
})
