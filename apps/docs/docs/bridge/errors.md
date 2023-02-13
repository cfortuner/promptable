---
sidebar_label: 'Errors'
---

# Errors

## Return an http error

Bridge provides a method to return errors to the client called `httpError`.

For example, this endpoint:

```ts twoslash title='server.ts'
import { handler, httpError } from 'bridge';

const hello = handler({
  resolve: () => httpError(400, 'Expired Session'),
});
```

Results to the following response with an error status 400:

```json
{
  "error": {
    "status": 400,
    "name": "Expired Session"
  }
}
```

The `StatusCode` enum in the Bridge library can be used to easily specify an error status in your response. You can also include additional details by passing them as the third argument to `httpError`, which will be sent to the client.

For example, this endpoint:

```ts twoslash title='server.ts'
import { handler, httpError, StatusCode } from 'bridge';

const hello = handler({
  resolve: () => httpError(StatusCode.UNAUTHORIZED, 'Expired Session', { reason: 'example' }),
});
```

Results to the following response with an error status 400:

```json
{
  "error": {
    "status": 400,
    "name": "Expired Session",
    "data": {
      "reason": "example"
    }
  }
}
```

## Throw an error

If you throw an error within a handler, it will send a JSON response to the client with a status code of 500. Similarly, an unexpected error in the resolve function of a handler will also result in a 500 response to the client. The client will not receive information about the cause of the error, which can be handled in Bridge's `errorHandler` function.

For example, this endpoint:

```ts twoslash title='server.ts'
import { handler } from 'bridge';

const hello = handler({
  resolve: () => {
    throw new Error('Test error');
  },
});
```

Results to the following response with an error status 500:

```json
{
  "error": {
    "status": 500,
    "name": "Internal server error"
  }
}
```

## Error Handler

All errors that occur in a handler are passed through the `onError` method before being sent to the client. This gives you the ability to customize the error object, log the errors, or send them to a bug reporting platform like Sentry.

**Example**

```ts twoslash
import { initBridge, onError } from 'bridge';

const errorHandler = onError(({ error, path }) => {
  // The error object can be modified here before it is sent to the client

  if (error.name === 'Internal server error') console.log(path, error); // Send to bug reporting
  else console.log(path, error.status, error.name, error.data);
});

const bridge = initBridge({ routes: {}, errorHandler });
```

The onError parameter is an object that contains all information about the error and the context it occurs in:

```ts
{
  path: string;
  error: {
    name: string;
    status: number;
    data?: any;
  }
}
```

<!--
:::info

To see how a handler can generate an error, refer to [this chapter](handler).

::: -->
