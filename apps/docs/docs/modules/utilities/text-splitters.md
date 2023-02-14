---
sidebar_label: "Text Splitter"
---

# Text Splitter

TextSplitter is an abstract class that provides a base implementation for splitting text into smaller chunks, such as paragraphs or sentences. It also includes methods for merging texts and documents.

## Usage

TextSplitter is an abstract class and cannot be instantiated directly. Instead, it should be extended to implement the splitText method.

## Splitter Types

The following subclasses are provided:

### CharacterTextSplitter

CharacterTextSplitter extends TextSplitter and splits text into chunks based on a character, such as a newline character. It provides the following options:

character: a string indicating the character to split on. Default is "\\n\\n", which splits on double newlines.

Example usage:

```ts
const splitter = new CharacterTextSplitter("\\n", { chunkSize: 500 });
const chunks = splitter.splitText(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus mauris ut dui bibendum, a convallis nisl laoreet. Sed sed enim ante. Suspendisse semper faucibus elit ac gravida.",
  { chunkSize: 200 }
);
```

### SentenceTextSplitter

SentenceTextSplitter extends TextSplitter and splits text into chunks based on sentence boundaries. It uses the sbd package it to identify sentence boundaries.

Example usage:

```ts
const splitter = new SentenceTextSplitter();
const chunks = splitter.splitText(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus mauris ut dui bibendum, a convallis nisl laoreet. Sed sed enim ante. Suspendisse semper faucibus elit ac gravida."
);
```

### TokenSplitter

TokenSplitter extends TextSplitter and splits text into chunks based on token boundaries. It uses the OpenAI GPT-3 tokenizer to identify tokens.

Example usage:

```ts
const splitter = new TokenSplitter({ chunkSize: 500 });
const chunks = splitter.splitText(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus mauris ut dui bibendum, a convallis nisl laoreet. Sed sed enim ante. Suspendisse semper faucibus elit ac gravida.",
  { overlap: 100 }
);
```
