/**
 * lodash-lite - A lightweight collection of the most commonly used Lodash methods
 */

// OBJECT UTILITIES

/**
 * Safely gets the value at path of object
 */
export function get<T>(object: any, path: string | string[], defaultValue?: T): T | undefined {
  const keys = Array.isArray(path) ? path : path.split(".")
  let result = object

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue
    }
    result = result[key]
  }

  return result === undefined ? defaultValue : result
}

/**
 * Creates a new object with the specified properties picked from the source object
 */
export function pick<T extends object, K extends keyof T>(object: T, paths: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>

  for (const path of paths) {
    if (path in object) {
      result[path] = object[path]
    }
  }

  return result
}

/**
 * Creates a new object excluding the specified properties
 */
export function omit<T extends object, K extends keyof T>(object: T, paths: K[]): Omit<T, K> {
  const result = { ...object }

  for (const path of paths) {
    delete result[path]
  }

  return result as Omit<T, K>
}

/**
 * Recursively merges own and inherited enumerable properties of source objects into the destination object
 */
export function merge<T extends object>(object: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return object

  const source = sources.shift()
  if (source === undefined) return object

  if (isObject(object) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!object[key]) Object.assign(object, { [key]: {} })
        merge(object[key] as object, source[key] as object)
      } else {
        Object.assign(object, { [key]: source[key] })
      }
    }
  }

  return merge(object, ...sources)
}

/**
 * Creates a deep clone of value
 */
export function cloneDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(cloneDeep) as unknown as T
  }

  if (isObject(value)) {
    return Object.keys(value).reduce((result, key) => {
      return {
        ...result,
        [key]: cloneDeep(value[key]),
      }
    }, {}) as T
  }

  return value
}

/**
 * Checks if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (Array.isArray(value) || typeof value === "string") {
    return value.length === 0
  }

  if (typeof value === "object") {
    return Object.keys(value).length === 0
  }

  return false
}

/**
 * Performs a deep comparison between two values
 */
export function isEqual(value: any, other: any): boolean {
  // Handle primitives
  if (value === other) return true
  if (value == null || other == null) return false
  if (typeof value !== typeof other) return false

  // Handle arrays
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) return false
    return value.every((val, i) => isEqual(val, other[i]))
  }

  // Handle objects
  if (isObject(value) && isObject(other)) {
    const valueKeys = Object.keys(value)
    const otherKeys = Object.keys(other)

    if (valueKeys.length !== otherKeys.length) return false

    return valueKeys.every((key) => {
      return otherKeys.includes(key) && isEqual(value[key], other[key])
    })
  }

  return false
}

// ARRAY UTILITIES

/**
 * Creates an array of elements split into groups the length of size
 */
export function chunk<T>(array: T[], size = 1): T[][] {
  const result: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

/**
 * Creates an array of unique values
 */
export function uniq<T>(array: T[]): T[] {
  return [...new Set(array)]
}

/**
 * Flattens array a single level deep
 */
export function flatten<T>(array: any[]): T[] {
  return array.reduce((result, item) => {
    return result.concat(item)
  }, [])
}

/**
 * Creates an object composed of keys generated from the results of running each element through iteratee
 */
export function groupBy<T>(array: T[], iteratee: (item: T) => string | number): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const key = iteratee(item)
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(item)
      return result
    },
    {} as Record<string, T[]>,
  )
}

// FUNCTION UTILITIES

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Creates a throttled function that only invokes func at most once per every limit milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// STRING UTILITIES

/**
 * Converts the first character of string to upper case and the remaining to lower case
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

// NUMBER UTILITIES

/**
 * Produces a random number between min and max (inclusive)
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// HELPER FUNCTIONS

function isObject(value: any): value is object {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}
