---
sidebar_label: "Chains"
---

# Chains

Chains are pre-built workflows for executing specific tasks. They combine a prompt and a model provider. 

## LLMChain

The simplest chain is the LLMChain, which takes a prompt and a completions model provider. 

```typescript
import { LLMChain, Prompt } from "promptable";

const writePoemPrompt = new Prompt("Write a poem about {{topic}}:", [
    "topic",
]);
const llmChain = new LLMChain(writePoemPrompt, completionsModelProvider);

const poem = await llmChain.run({ topic: "the moon" });
```

The `run` method executes the chain and returns the parsed result.

Chains often have many steps, and tracing can help you understand what is happening in your chain. You can enable tracing by using the `setTraceConfig` function.

```typescript
import { setTraceConfig } from "promptable";

setTraceConfig({
    send: (trace) => {
        console.log("Received Trace", trace);
    },
});
```

You can also visualize the trace graphically with `graphTraces`.

```typescript
import { graphTraces } from "promptable";

graphTraces(traces);
```

## More Chains
More chains are coming soon! Keep an eye on this library for updates. Here are some you can expect to see very shortly:
- `MemoryLLMChain` - A chain combines an `LLMChain` with memory. This enables easily building custom chatbots for example.
- `QaLLMChain` - A chain that combines an `LLMChain` with embeddings. This enables QA applications over documents.
- `SummaryChain` - A chain that combines an `LLMChain` with a summary prompt for summarization purposes.

Send us a message if you have a chain you would like to see added to this library.