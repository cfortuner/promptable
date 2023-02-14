---
sidebar_label: "Embeddings"
---

# Embeddings

Embeddings is a interface to help you create embeddings (dense vectors of numbers) for words or phrases using embeddings model providers. It allows you to index and query documents, so you can find similarities between them based on the embeddings of the words they contain. You can use Embeddings to build applications that work with text, such as search engines, chatbots, and recommendation systems.

## Features

The main features of Embeddings are:

- Creating embeddings for words or phrases using embeddings model providers.
- Indexing and querying documents to find similarities between them based on their embeddings.
- Caching the index to improve performance and reduce the time needed to create embeddings.
- Clearing the cache and re-indexing documents if necessary.
- Saving the embeddings to a file for future use.
- Providing an interface for extracting answers from embeddings using a prompt.

## Usage

```ts
import {
  OpenAI,
} from "@providers/ModelProvider";
import { Document } from "src";

const embeddings = new Embeddings(
  "my-embeddings",
  new OpenAI(),
  [document1, document2, ...],
  { cacheDir: "path/to/cache/directory" }
);
```

After creating an instance of Embeddings, you can index your documents by calling the index() method:

```ts
await embeddings.index();
```

Once your documents are indexed, you can query them by calling the query() method:

```ts
const results = await embeddings.query("query", 10);
```

You can also clear the cache and re-index your documents by calling the clearCache() method and then the index() method again:

```ts
embeddings.clearCache();
await embeddings.index();
```

To save the embeddings to a file, you can call the save() method:

```ts
embeddings.save();
```
