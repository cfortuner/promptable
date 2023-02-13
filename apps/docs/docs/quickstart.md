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

## Usage

## Generating Text

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

// Create a prompt
const writePoemPrompt = new p.Prompt(
  // your instructions go here
  "Write a poem about {{topic}}:".trim(),
  [
    // variable names go here
    "topic",
  ]
);

const text = "This is a test";
// count tokens
const tokensUsed = openai.countTokens(text);

// Generate text completions!
const response = await openai.generate(text);

// Or stream the response!
await openai.stream(promptText, (chunk: string) => {
  console.log(chunk);
});
```

## Contributing

See the [contributing guide](./contributing.md) to learn how to contribute to the repository and the development workflow.
