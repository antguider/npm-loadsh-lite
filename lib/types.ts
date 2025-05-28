/**
 * Type definitions for the utility library
 */

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type Primitive = string | number | boolean | null | undefined

export type ValueOf<T> = T[keyof T]
