---
sidebar_label: 'Server Side Calls'
---

# Server Side Calls

You can directly access the resolve function of any handler. Its type will be inferred automatically.

## Example

```ts twoslash
import { handler, httpError } from 'bridge';
import z from 'zod';

const users: Record<string, { firstName: string; lastName: string }> = {
  '1': {
    firstName: 'John',
    lastName: 'Doe',
  },
};

const getMyIdWithToken = handler({
  headers: z.object({ token: z.string() }),
  resolve: ({ headers }) => {
    if (headers.token === 'token') return { id: '1' };
    else return httpError(400, 'Wrong token');
  },
});

const getProfileWithToken = handler({
  headers: z.object({ token: z.string() }),
  resolve: ({ headers }) => {
    const res = getMyIdWithToken.resolve({ headers });
    //     ^?
    if ('error' in res) return res;
    return users[res.id];
  },
});
```

This example shows two handlers that can be used as endpoints and called separately. `getProfileWithToken` uses the resolve function of `getMyIdWithToken`.

:::caution
The above example doesn't make much sense, it would be more logical to use getMyIdWithToken as a middleware for getProfileWithToken. This would make the code shorter and clearer. Here is the revised code:
:::

```ts twoslash
import { handler, httpError, apply } from 'bridge';
import z from 'zod';

const users: Record<string, { firstName: string; lastName: string }> = {
  '1': {
    firstName: 'John',
    lastName: 'Doe',
  },
};

const getMyIdWithToken = handler({
  headers: z.object({ token: z.string() }),
  resolve: ({ headers }) => {
    if (headers.token === 'token') return { id: '1' };
    else return httpError(400, 'Wrong token');
  },
});

const getProfileWithToken = handler({
  middlewares: apply(getMyIdWithToken),
  resolve: ({ mid }) => users[mid.id],
});
```
