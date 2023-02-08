---
sidebar_label: 'Middlewares'
---

# Middlewares

## Creating a middleware

Creating a middleware is just as easy as creating a handler. In fact, a middleware is a handler, so it can validate data and return errors in the same way as usual.

The calling handler's resolve function receives the return value of the middleware in the mid object. Its type is inferred automatically. If the middleware returns an httpError, it will send an error to the client and the calling handler's resolve function will not be executed.

**Example**

```ts twoslash
import { apply, handler, httpError, StatusCode } from 'bridge';
import z from 'zod';

const authMiddleware = handler({
  headers: z.object({ token: z.string() }),
  resolve: ({ headers }) => {
    if (headers.token !== 'private_token') return httpError(StatusCode.UNAUTHORIZED, 'Wrong token');
    else return { firstName: 'John', name: 'Doe', age: 21 };
  },
});

const updateUser = handler({
  middlewares: apply(authMiddleware),
  body: z.object({ age: z.number() }),
  resolve: ({ middlewares, body }) => {
    //         ^?
    const user = middlewares;
    user.age = body.age;
    return user;
  },
});
```

## Multiple middlewares

Multiple middlewares are run simultaneously, and their return values are merged into the `mid` object of the calling handler.

**Example**

```ts twoslash
import { apply, handler } from 'bridge';

const middleware1 = handler({
  resolve: () => ({ firstName: 'John' }),
});

const middleware2 = handler({
  resolve: () => ({ lastName: 'Doe' }),
});

const getMe = handler({
  middlewares: apply(middleware1, middleware2),
  resolve: ({ middlewares }) => {
    //        ^?
    return middlewares;
  },
});
```

## Nested middlewares

To run middlewares one after the other, you can nest them by adding a middleware inside another middleware.

**Example**

```ts twoslash
import { apply, handler } from 'bridge';

const mid1 = handler({
  resolve: () => ({ firstName: 'John' }),
});

const mid2 = handler({
  middlewares: apply(mid1),
  resolve: ({ middlewares }) => ({ fullName: `${middlewares.firstName} Doe` }),
});

const mainHandler = handler({
  middlewares: apply(mid2),
  resolve: ({ middlewares }) => middlewares,
  //          ^?
});
```

The mainHandler will return

```json
{
  "fullName": "John Doe"
}
```
