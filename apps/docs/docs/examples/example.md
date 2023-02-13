---
sidebar_label: 'Example'
---

# Example

```ts twoslash title='server.ts' showLineNumbers
import { initBridge, handler, onError, StatusCode, httpError, apply } from 'bridge';
import express from 'express';
// You can also use Yup or Superstruct for data validation
import z from 'zod';

const port = 8080;

// A middleware is also a handler
const authMiddleware = handler({
  headers: z.object({ token: z.string().min(5) }),
  resolve: ({ headers }) => {
    //          ^?
    if (headers.token !== 'private_token') return httpError(StatusCode.UNAUTHORIZED, 'Wrong token');
    else return { firstName: 'John', name: 'Doe', age: 21 };
  },
});

// A handler can be used as an endpoint
const updateUser = handler({
  middlewares: apply(authMiddleware),
  body: z.object({ age: z.number() }),
  resolve: (data) => {
    //       ^?
    const user = data.middlewares;
    user.age = data.body.age;
    return user;
  },
});

// You can have multiple endpoints for the same route with different methods with the method function
const routes = {
  hey: handler({ resolve: () => 'hey' }), // POST /hey
  hello: handler({
    query: z.object({ name: z.string().optional() }),
    resolve: ({ query }) => `Hello ${query.name}`,
  }), // POST /hello
  user: {
    update: updateUser, // POST /user/update
  },
};

const errorHandler = onError(({ error, path }) => {
  // The error object can be modified here before it is sent to the client
  if (error.name === 'Internal server error') console.log(path, error); // Send to bug reporting
  else console.log(path, error.status, error.name);
});

// It is also possible to use HTTP Server
const app = express();

app.use('', initBridge({ routes, errorHandler }).expressMiddleware());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
