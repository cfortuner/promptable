---
sidebar_label: 'Routes'
---

# Routes

## Definition

Defining the routes for your Bridge project is simple – it's a object with your handlers at the leaf nodes of the object tree.

In addition to defining individual routes, you can create nested routes by adding new objects to your router. Nested routes let you group related routes together for a more complex and organized API.

**Example**

```ts twoslash title='server.ts'
import { handler, initBridge } from 'bridge';

const helloHandler = handler({
  resolve: () => 'Hello',
});

const byeHandler = handler({
  resolve: () => 'Bye',
});

const routes = {
  hello: helloHandler, // POST /hello
  bye: byeHandler, // POST /bye
  user: {
    getMe: helloHandler, // POST /user/getMe
    friends: {
      byeHandler, // POST /user/friends/byeHandler
    },
  },
};

initBridge({ routes })
  .HTTPServer()
  .listen(8080, () => {});
```

:::tip

For the best experience with Bridge, we recommend sticking to POST methods for your endpoints. This aligns with our goal of treating the API like a client code library and removes the need for methods. However, if you need to change an endpoint method or have multiple endpoints for the same route, you can use the `method` function in Bridge.

:::

## Multiple endpoints for one route

```ts
import { method } from 'Bridge';

const routes = {
  user: method({
    GET: handler1, // GET /user
    POST: handler2, // POST /user
    PATCH: handler3, // PATCH /user
    PUT: handler4, // PUT /user
    DELETE: handler5, // DELETE /user
  }),
};
```

<!--
## Nested Routes

In addition to defining individual routes, you can create nested routes by adding new objects to your router. Nested routes let you group related routes together for a more complex and organized API.

**Example**

```ts
const routes = {
  // POST /hey
  hey: heyHandler,
  admin: {
    // POST /admin/signin
    signin: signinHandler,
    users: {
      // POST /admin/users/create
      create: createUserHandler,
      // POST /admin/users/get
      get: getUserHandler,
    },
  },
};
``` -->

## Route Not Found

If the endpoint's route is not found, Bridge will respond to the client with a 404 error and the following object:

```json
{
  "error": {
    "status": 404,
    "name": "Route not found"
  }
}
```

:::info

If you prefer using OOP and want to define your handlers inside classes, it's easy to do so by adding an instance of the class to the routes object.

:::
