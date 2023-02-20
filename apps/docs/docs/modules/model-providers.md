---
sidebar_label: "Model Providers"
---

# Model Providers

Model Providers are interfaces for interacting with different model providers. They allow you to easily switch between providers without having to change your code.

You can use Model providers in the same way you would use the OpenAI API.

## Creating a Model Provider

```ts title ="examples/model-providers.ts"
import { OpenAI } from "promptable";
const openai = new OpenAI(apiKey);
//or
const openai = new OpenAI(apiKey, {
  // Provide OpenAI Configuration here
});
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
await openai.stream(
  promptText,
  (chunk: string) => {
    console.log(chunk);
  },
  () => {
    console.log("Done");
  }
);
```

### Rate limiting

Some model providers (eg. `OpenAI`) have rate limits on the number of requests and tokens per minute.
By default, Promptable will handle rate limiting for you assuming you are using `text-davinci` as your model.

If you are using a different model or you want to set your own rate limits, you can do so:
```ts
// Codex model rate limits
new OpenAI(apiKey, { rateLimitConfig: { requestsPerMinute: 20, tokensPerMinute: 40000 } });
```
