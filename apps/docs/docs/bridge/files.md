---
sidebar_label: 'Files'
---

# Files

Bridge integrates seamlessly with `formidable` to receive and handle files on your server. Simply install `formidable` and pass it to `initBridge` to enable this feature. You can use the `apply` function in Bridge to specify the names of specific files you want your client to send, or use "any" to accept any file.

## Install [formidable](https://www.npmjs.com/package/formidable)


``` bash title='terminal'
npm i formidable
npm i --save-dev formidable
```

## Example

```ts twoslash title='server.ts'
import { initBridge, handler, apply } from 'bridge';
import formidable from 'formidable';

const sendAnyFiles = handler({
  files: 'any',
  resolve: ({ files }) => {
    //          ^?
    console.log(files);
    return { success: true };
  },
});

const sendSpecificFiles = handler({
  files: apply('profilePicture', 'coverPicture'),
  resolve: ({ files }) => {
    //          ^?
    console.log(files);
    return { success: true };
  },
});

const routes = {
  sendAnyFiles,
  sendSpecificFiles,
};

const bridge = initBridge({ routes, formidable });
```

## Error Example

"If the user submits files with incorrect names, Bridge will respond with a 400 Bad Request error, denoted as "Files schema validation error". Here is an example:

```json
{
  "error": {
    "status": 400,
    "name": "Files schema validation error",
    "data": {
      "missingFiles": ["profilePicture"]
    }
  }
}
```
