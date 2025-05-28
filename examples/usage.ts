import {
  get,
  pick,
  omit,
  merge,
  cloneDeep,
  isEmpty,
  isEqual,
  chunk,
  uniq,
  flatten,
  groupBy,
  debounce,
  throttle,
  capitalize,
  random,
} from "../lib"

// Object utilities examples
const user = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "New York",
    zip: "10001",
  },
  roles: ["admin", "user"],
}

console.log("get:", get(user, "address.city")) // "New York"
console.log("get with default:", get(user, "address.country", "USA")) // "USA"

console.log("pick:", pick(user, ["id", "name"])) // { id: 1, name: "John Doe" }
console.log("omit:", omit(user, ["address", "roles"])) // { id: 1, name: "John Doe" }

const merged = merge({ a: 1 }, { b: 2 }, { c: 3 })
console.log("merge:", merged) // { a: 1, b: 2, c: 3 }

const original = { a: 1, b: { c: 2 } }
const clone = cloneDeep(original)
console.log("cloneDeep:", clone) // { a: 1, b: { c: 2 } }
console.log("Are references different:", original.b !== clone.b) // true

console.log("isEmpty:", isEmpty({})) // true
console.log("isEmpty:", isEmpty([1, 2, 3])) // false

console.log("isEqual:", isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })) // true
console.log("isEqual:", isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })) // true
console.log("isEqual:", isEqual([1, 2, 3], [1, 2, 3])) // true

// Array utilities examples
console.log("chunk:", chunk([1, 2, 3, 4, 5], 2)) // [[1, 2], [3, 4], [5]]
console.log("uniq:", uniq([1, 2, 2, 3, 3, 4])) // [1, 2, 3, 4]
console.log("flatten:", flatten([[1, 2], [3, 4], [5]])) // [1, 2, 3, 4, 5]

const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" },
  { id: 4, role: "user" },
]

console.log(
  "groupBy:",
  groupBy(users, (user) => user.role),
)
// { admin: [{ id: 1, role: "admin" }, { id: 3, role: "admin" }], user: [{ id: 2, role: "user" }, { id: 4, role: "user" }] }

// String utilities examples
console.log("capitalize:", capitalize("hello world")) // "Hello world"

// Number utilities examples
console.log("random:", random(1, 10)) // Random number between 1 and 10

// Function utilities examples
// These would typically be used with event handlers
const debouncedFn = debounce(() => {
  console.log("Debounced function called")
}, 300)

const throttledFn = throttle(() => {
  console.log("Throttled function called")
}, 300)

// Call these functions multiple times to see the effect
// debouncedFn();
// throttledFn();
