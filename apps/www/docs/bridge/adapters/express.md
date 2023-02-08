---
sidebar_label: 'Express'
---

# Express

**Example**

```ts twoslash title='server.ts'
import { initBridge, handler } from 'bridge';
import express from 'express';

const hello = handler({
  resolve: () => 'hello',
});

const bridge = initBridge({ routes: { hello } });

const port = 8080;

const app = express();

app.use('', bridge.expressMiddleware());

app.listen(port, () => {
  `Listening on port ${port}`;
});
```
