// @flow

export function format(
  strings: Array<string>,
  ...values: Array<any>
): string {
  return values.join(' ')
}
