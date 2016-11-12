/* @flow */

export default function format(
  strings: Array<string>,
  ...values: Array<any>
): string {
  return values.join(' ')
}
