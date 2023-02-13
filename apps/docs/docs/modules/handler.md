---
sidebar_label: 'Handler'
---

# Handler

The `handler` is the core concept of Bridge. This function helps you create endpoints and middlewares for your Bridge server.

## Resolve Function

The `resolve` function is the only required parameter of a handler. You can either return a json object, a string or a number with the resolve function. If the function returns void, the client will receive an empty object in response.

```ts
import { handler } from 'bridge';

// Returns the string "Hello World" with an http status code 200
const handler1 = handler({
  resolve: () => 'Hello World',
});

// Returns the number 42 with an http status code 200
const handler2 = handler({
  resolve: () => 42,
});

// Returns the json { name: "John", age: 42 } with an http status code 200
const handler3 = handler({
  resolve: () => ({ name: 'John', age: 42 }),
});

// Returns the empty json {} with an http status code 200
const handler3 = handler({
  resolve: () => {
    console.log('hello');
  },
});
```
