---
sidebar_label: 'With Node HTTP'
---

# With Node HTTP

## Example


```ts twoslash title='server.ts'
import { initBridge, handler } from 'bridge';

const hello = handler({
  resolve: () => 'hello',
});

const bridge = initBridge({ routes: { hello } });

const port = 8080;

bridge.HTTPServer().listen(port, () => {
  `Listening on port ${port}`;
});
```
