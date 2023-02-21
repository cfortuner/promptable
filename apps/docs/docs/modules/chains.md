---
sidebar_label: "Chains"
---

# Chains

Chains are pre-built workflows for executing specific tasks. They combine a prompt and a model provider.

## LLMChain

The simplest chain is the LLMChain, which takes a prompt and a completions model provider.

```typescript
import { LLMChain, Prompt } from "@promptable/promptable";

const writePoemPrompt = new Prompt("Write a poem about {{topic}}:", ["topic"]);
const llmChain = new LLMChain(writePoemPrompt, completionsModelProvider);

const poem = await llmChain.run({ topic: "the moon" });
```

The `run` method executes the chain and returns the parsed result.

## MemoryLLMChain

The MemoryLLMChain combines a prompt, a model provider, and memory. Memory is a way to store and retrieve data between chain runs. This chain is useful for building custom chatbots and other conversational AI applications.

The following example uses MemoryLLMChain to create a simple chatbot based on a prompt. BufferedChatMemory is a memory which stores the user and bot messages in a buffer, up to a maximum number of interactions (defaulted at Infinity). MemoryLLMChain will automatically extract the memory from the BufferedChatMemory and pass it to the prompt.

```typescript
const memory = new BufferedChatMemory();
const memoryChain = new MemoryLLMChain(prompts.chatbot(), openai, memory);
while (true) {
  const { userInput } = await query({
    type: "input",
    name: "userInput",
    message: "User: ",
  });
  if (userInput) {
    if (userInput === "exit") break;
    memory.addUserMessage(userInput);
    const botOutput = await memoryChain.run({ userInput });
    memory.addBotMessage(botOutput);
    console.log(chalk.yellow("Assistant:", botOutput));
  }
}
```

This example uses a pre-built prompt for chatbots. You can also use your own custom prompts. See the [prompts](./prompts.md) docs for more info.

## CombineDocumentsChain

The CombineDocumentsChain combines documents using a TextSplitter and an Optional LLMChain. It is useful for combining multiple documents into a single document to be provided as context for a prompt. The following example combines two documents into a single document by splitting them, and summarizing them.

```typescript
import { CombineDocumentsChain, Prompt } from "@promptable/promptable";

const summarizeDocumentPrompt = new Prompt(
  `Combine the following documents into a single document:
  {{document}}

  Results:
  `,
  ["document"]
);

const combineDocumentsChain = new CombineDocumentsChain(
  new CharacterTextSplitter("\n\n") // split on paragraphs
  (documents: Document[], meta: any) => documents.join("\n"), // join with newlines
  summarizeDocumentPrompt,
);

const combinedDocument = await combineDocumentsChain.run({
  documents: [
    "The quick brown fox jumps over the lazy dog.",
    "The quick brown fox jumps over the lazy dog.",
  ],
});

console.log(combinedDocument);
```

## Question Answer Chain

QA Chains allow you to ask a question about a set of documents and generate an answer using a LLM. QA chains can be created by providing a set of documents and a LLMChain to answer the question.

```typescript

import { QuestionAnswerChain, Prompt } from "@promptable/promptable";

const answerQuestionPrompt = new Prompt(
  `Answer the following question:
  {{question}}

  Results:
  `,
  ["question"]
);

const combineDocumentsChain = new QuestionAnswerChain(
  new CharacterTextSplitter("\n\n") // split on paragraphs
  (documents: Document[], meta: any) => documents.join("\n"), // join with newlines
);

const qaChain = new QuestionAnswerChain(
  documents,
  combineDocumentsChain,
  answerQuestionPrompt,
);
```
