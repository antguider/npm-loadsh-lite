# lodash-lite

A lightweight collection of the 15 most commonly used Lodash methods, implemented in TypeScript.

## Installation

\`\`\`bash
npm install lodash-lite
\`\`\`

## Available Methods

### Object Utilities

- **get(object, path, [defaultValue])** - Gets the value at path of object
- **pick(object, [paths])** - Creates an object with the picked object properties
- **omit(object, [paths])** - Creates an object with omitted properties
- **merge(object, [sources])** - Recursively merges objects
- **cloneDeep(value)** - Creates a deep clone of value
- **isEmpty(value)** - Checks if value is empty
- **isEqual(value, other)** - Performs a deep comparison between two values

### Array Utilities

- **chunk(array, [size=1])** - Creates an array of elements split into groups
- **uniq(array)** - Creates an array of unique values
- **flatten(array)** - Flattens array a single level deep
- **groupBy(array, iteratee)** - Creates an object composed of keys generated from the results

### Function Utilities

- **debounce(func, wait)** - Creates a debounced function
- **throttle(func, limit)** - Creates a throttled function

### String Utilities

- **capitalize(string)** - Capitalizes the first character of string

### Number Utilities

- **random(min, max)** - Produces a random number between min and max (inclusive)

## Usage

\`\`\`javascript
import { get, chunk, debounce } from 'lodash-lite';

// Get nested property safely
const user = { profile: { name: 'John' } };
const name = get(user, 'profile.name'); // 'John'
const age = get(user, 'profile.age', 30); // 30 (default value)

// Split array into chunks
const chunks = chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Debounce a function
const handleSearch = debounce((query) => {
  // Search logic here
}, 300);
\`\`\`

## Why lodash-lite?

- **Lightweight**: Only includes the 15 most commonly used methods
- **TypeScript**: Full TypeScript support with proper type definitions
- **Modern**: Uses ES6+ features
- **Tree-shakable**: Import only what you need

## License

MIT
