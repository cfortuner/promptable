---
sidebar_label: 'Data Validation'
---

# Data Validation

You have the option to validate and process the body, query parameters, and headers sent by the client using the Zod, Superstruct, or Yup libraries. While all three are effective options, we highly recommend using Zod for the best developer experience.

- `body`: Record<string, any> (always a JSON object)
- `query`: Record<string, string>
- `headers`: Record<string, string>
- `files`: apply(...string[]) (check [files](files))

## With [Zod](https://github.com/colinhacks/zod)

```ts twoslash
import { handler } from 'bridge';
import z from 'zod';

const updateMe = handler({
  headers: z.object({ token: z.string().min(5) }),
  query: z.object({ _id: z.string() }),
  body: z.object({
    name: z.string(),
    age: z.number().optional(),
    type: z.enum(['admin', 'user']).optional(),
    address: z.object({
      street: z.string(),
    })
  }),
  resolve: (data) => {
    //       ^?
    const { body, query, headers } = data;

    return { success: true };
  },
});
```

## With [Superstruct](https://github.com/ianstormtaylor/superstruct)

```ts twoslash
import { handler } from 'bridge';
import { object, number, string, enums, size, optional } from 'superstruct';

const updateMe = handler({
  headers: object({ token: size(string(), 5) }),
  query: object({ _id: string() }),
  body: object({
    name: optional(string()),
    age: optional(number()),
    type: optional(enums(['admin', 'user'])),
  }),
  resolve: ({ body, query, headers }) => {
    return { success: true };
  },
});
```

## With [Yup](https://github.com/jquense/yup)

```ts twoslash
import { handler } from 'bridge';
import * as yup from 'yup';

const updateMe = handler({
  headers: yup.object({ token: yup.string().min(5).required() }),
  query: yup.object({ _id: yup.string().required() }),
  body: yup.object({
    name: yup.string(),
    age: yup.number(),
    type: yup.mixed().oneOf(['admin', 'user']),
  }),
  resolve: ({ body, query, headers }) => {
    return { success: true };
  },
});
```

## Error Example

If the data submitted by the user is not in the correct format, Bridge will return a 400 Bad Request error, labeled as "Body|Query|Headers schema validation error". Here is an example using **Zod**:

```json
{
  "error": {
    "status": 400,
    "name": "Body schema validation error",
    "data": {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": ["name"],
          "message": "Required"
        }
      ],
      "name": "ZodError"
    }
  }
}
```
