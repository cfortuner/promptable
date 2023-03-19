---
sidebar_label: "Quickstart"
---

# Quickstart

## Installation

```bash title='terminal'
npm i promptable
```

## Provider Setup

If you want to use a Model Provider like OpenAI, you must first create an api key.

Create your api key:

[Create a OpenAI API Key](https://platform.openai.com/account/api-keys)

Once you have it, you can configure promptable by creating a `.env` file in the root of your project and adding your provider's API key to it.

```bash title='.env'
OPENAI_API_KEY=<your api key>
```

## Basics

Importing the library:

```ts
import * as p from "@promptable/promptable";
```

Create a model provider

```ts
const provider = new p.OpenAI(apiKey);
```

Create a prompt

```ts
const writePoemPrompt = new p.Prompt(
  // your instructions go here
  "Write a poem about {{topic}}:".trim(),
  [
    // variable names go here
    "topic",
  ]
);
```

Format the prompt with your variables

```ts
const text = writePoemPrompt.format({
  topic: "hi",
});
```

Count tokens in text

```ts
const tokensUsed = provider.countTokens(text);
```

Generate text completions!

```ts
const response = await provider.generate(text);

// Or stream the response!
await provider.stream(promptText, (chunk: string) => {
  console.log(chunk);
});
```

## Using Embeddings

```ts
import * as p from "promptable";

// Create a model provider!
const provider = new p.OpenAI(apiKey);

// Load documents
const filepath = "./data/startup-mistakes.txt";
const loader = new p.FileLoader(filepath);
let docs = await loader.load();

// Split documents into chunks
const splitter = new p.CharacterTextSplitter("\n");
docs = splitter.splitDocuments(docs, {
  chunk: true,
  chunkSize: 1000, // tokens :)
});

// Create embeddings
const embeddings = new p.Embeddings(provider, documents);
await embeddings.index();

// Query embeddings
embeddings.query("startup mistakes");
```

## Contributing

See the [contributing guide](./contributing.md) to learn how to contribute to the repository and the development workflow.
