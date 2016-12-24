
// @flow

import type { PointT } from '../types'

import { point } from '../core/point'
import * as codes from '../core/codes'
import { round, defaultPrecision } from '../core/utils/round'
import { format } from '../core/utils/format'

export function m(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.m }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function M(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.M }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function l(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.l }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function L(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.L }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function h(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.h }
    ${ round(current.x - previous.x, precision) }
  `
}

export function H(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.H }
    ${ round(current.x, precision) }
  `
}

export function v(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.v }
    ${ round(current.y - previous.y, precision) }
  `
}

export function V(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.V }
    ${ round(current.y, precision) }
  `
}

export function q(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.q }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1 - previous.x, precision) :
        round((current.x - previous.x) / 2, precision)
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1 - previous.y, precision) :
        round((current.y - previous.y) / 2, precision)
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function Q(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.Q }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1, precision) :
        round(previous.x + ((current.x - previous.x) / 2), precision)
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1, precision) :
        round(previous.y + ((current.y - previous.y) / 2), precision)
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function t(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.t }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function T(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.T }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function c(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.c }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1 - previous.x, precision) :
        0
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1 - previous.y, precision) :
        0
    }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2 - previous.x, precision) :
        round(current.x - previous.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2 - previous.y, precision) :
        round(current.y - previous.y, precision)
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function C(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.C }
    ${
      typeof current.parameters.x1 !== 'undefined' ?
        round(current.parameters.x1, precision) :
        round(previous.x, precision)
    }
    ${
      typeof current.parameters.y1 !== 'undefined' ?
        round(current.parameters.y1, precision) :
        round(previous.y, precision)
    }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2, precision) :
        round(current.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2, precision) :
        round(current.y, precision)
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function s(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.s }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2 - previous.x, precision) :
        round(current.x - previous.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2 - previous.y, precision) :
        round(current.y - previous.y, precision)
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function S(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.S }
    ${
      typeof current.parameters.x2 !== 'undefined' ?
        round(current.parameters.x2, precision) :
        round(current.x, precision)
    }
    ${
      typeof current.parameters.y2 !== 'undefined' ?
        round(current.parameters.y2, precision) :
        round(current.y, precision)
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function a(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.a }
    ${
      typeof current.parameters.rx !== 'undefined' ?
        round(current.parameters.rx, precision) :
        0
    }
    ${
      typeof current.parameters.ry !== 'undefined' ?
        round(current.parameters.ry, precision) :
        0
    }
    ${
      typeof current.parameters.rotation !== 'undefined' ?
        round(current.parameters.rotation, precision) :
        0
    }
    ${
      typeof current.parameters.large !== 'undefined' ?
        current.parameters.large :
        0
    }
    ${
      typeof current.parameters.sweep !== 'undefined' ?
        current.parameters.sweep :
        0
    }
    ${ round(current.x - previous.x, precision) }
    ${ round(current.y - previous.y, precision) }
  `
}

export function A(
  current: PointT,
  previous: PointT = point(),
  precision: number = defaultPrecision,
): string {
  return format`
    ${ codes.A }
    ${
      typeof current.parameters.rx !== 'undefined' ?
        round(current.parameters.rx, precision) :
        0
    }
    ${
      typeof current.parameters.ry !== 'undefined' ?
        round(current.parameters.ry, precision) :
        0
    }
    ${
      typeof current.parameters.rotation !== 'undefined' ?
        round(current.parameters.rotation, precision) :
        0
    }
    ${
      typeof current.parameters.large !== 'undefined' ?
        current.parameters.large :
        0
    }
    ${
      typeof current.parameters.sweep !== 'undefined' ?
        current.parameters.sweep :
        0
    }
    ${ round(current.x, precision) }
    ${ round(current.y, precision) }
  `
}

export function z(): string {
  return format`
    ${ codes.z }
  `
}

export function Z(): string {
  return format`
    ${ codes.Z }
  `
}
