---
sidebar_label: "Chains"
---

# Chains

Chains are pre-built workflows for executing specific tasks. They combine a prompt and a model provider.

## LLMChain

The simplest chain is the LLMChain, which takes a prompt and a completions model provider.

```typescript
import { LLMChain, Prompt } from "@promptable/server";

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

## Tracing Chains

Chains often have many steps, and tracing can help you understand what is happening in your chain. You can enable tracing by using the `setTraceConfig` function.

```typescript
import { setTraceConfig } from "@promptable/server";

setTraceConfig({
  send: (trace) => {
    console.log("Received Trace", trace);
  },
});
```

You can also visualize the trace graphically with `graphTraces`.

```typescript
import { graphTraces } from "@promptable/server";

graphTraces(traces);
```

## More Chains

More chains are coming soon! Keep an eye on this library for updates. Here are some you can expect to see very shortly:

- `QaLLMChain` - A chain that combines an `LLMChain` with embeddings. This enables QA applications over documents.
- `SummaryChain` - A chain that combines an `LLMChain` with a summary prompt for summarization purposes.

Send us a message if you have a chain you would like to see added to this library.
