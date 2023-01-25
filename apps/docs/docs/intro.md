---
sidebar_position: 1
---

# Promptable.js

⚡ Promptable.js is a Typescript library for building Fullstack applications with LLMs. ⚡

Large Language models are emerging as a powerful tool to use for variety of tasks. With OpenAI models like GPT-3 only an API call away, it's become possible to build applications that use AI as a core software component for business logic, data processing, content generation and more. Traditionally, AI tooling has only been built in python to power backend systems, but with the success of ChatGPT, we have learned that the UI/UX of an app is just as important as the backend.

This project aims to provide a set of general tools for Typescript and Javascript developers to help them build fullstack AI first applications.

# Installation

Install Promptable

```
npm i promptable
```

# Features

Supports

- Prompt Templating
- Chaining
- Memory
- Indices
- Readers
- Model Evaluation
- Model Provider Apis

# Basics

The simplest LLM app involves calling a LLM via an api provider like OpenAI and using the result.

Here's how you can write your own chatbot in Promptable

```typescript
// Choose your AI Provider
const openAI = new OpenAI(apiKey);

// Create a prompt
const prompt = new Prompt({
  prompt: `
    You're a helpful chatbot talking with a user.

    Conversation:
    {{chatHistory}}
    User: {input}
    You:
  `,
  variables: ["input", "chatHistory"],
});

// Create a chatbot with Memory
const chatBot = new MemoryChain(openAI, prompt);

// Chat Bot
const response = await chatBot.call({
  input: "Hi how are you?",
});

console.log(response); // "Good! How are you?"
```

# APIs

## Models

## Prompt Templates

Prompt Templates are simple builders for LLM Prompts.

They include a variety of common helper functions that make it easier to manage your text prompts in your apps.

## Chains

Chains are simple building blocks to help you augment LLMs with additional functionality. They can be combined to build workflows for many tasks.

Some examples of common chains are:

- PromptChain

  PromptChains maintain state about previous calls and using this to update the Prompt with useful context for your task.

- MemoryChain

  MemoryChains store the result of calls and inject them back into the prompt to create apps like conversational assistants.

- QAChain
- SearchChain
- ClassifyChain
- MathChain
- ParseChain
- EvalChain
