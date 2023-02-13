---
sidebar_label: "Embeddings"
---

# Embeddings

Embeddings is a class that simplifies the process of embedding text. It allows you to easily embed text using different embedding providers. It also acts as an Index for your embeddings to allow you to easily query your embeddings for similar text.

## Features

- indexing and caching your embeddings
- querying your embeddings for similar text
- updating, deleting from your index (coming soon)

## Creating Embeddings

```ts title ="examples/embeddings.ts"
import { OpenAI } from "promptable";
```

## Using a Model Provider

### Text Generation

You can use the model provider to complete text generation.

```ts title ="examples/model-providers.ts"
import { OpenAI } from "promptable";

const text = "This is a test";
const tokensUsed = openai.countTokens(text);
const response = await openai.generate(text);

console.log("Tokens: ", tokensUsed);
console.log(response);
```

### Streaming

With OpenAI, you can also stream completions like this:

```ts
import { OpenAI } from "promptable";

const text = "This is a test";
const tokensUsed = openai.countTokens(text);
await openai.stream(promptText, (chunk: string) => {
  console.log(chunk);
});
```
