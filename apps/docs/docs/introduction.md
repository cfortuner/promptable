---
sidebar_label: "Introduction"
---

# Introduction

Promptable is a Typescript library for building fullstack AI applications.

Promptable consists of a collection of utilities and interfaces that help you build applications with LLMs. It is designed to be flexible and extensible so that you can use it with any LLM or Embeddings provider.

<div className="bg-purple-700 rounded-md p-6">
  <p><strong>Note!</strong> This project is still a work in progress and is very much experimental. Don't use this in production yet! The API is subject to change as we get feedback.</p>
</div>

### Features

- [Prompts](./modules/prompts.md) for templating and formatting
- [Model Providers](./modules/model-providers.md) for Text Generation and Embedding Generation
- [Embeddings](./modules/embeddings.md) for creating Embeddings, Indexing and Search
- [Tracing](./modules/tracing.md) for debugging your applications!
- [Utilities](./modules/utilities.md) for working with text and data.

### Web UI

To assist in debugging, we also provide a Tracing UI that helps you visualize the steps taken by the LLM to generate the output.

<img src="/img/tracing.png" className="mt-12 rounded-md" />

## Motivation

Large Language models are emerging as a powerful tool to use for variety of tasks. With OpenAI models like GPT-3 only an API call away, it's become possible to build applications that use AI as a core software component for business logic, data processing, content generation and more. Traditionally, AI tooling has only been built in python to power backend systems, but with the success of ChatGPT, we have learned that the UI/UX of an app is just as important as the backend.

This project aims to provide a set of general tools for Typescript and Javascript developers to help them build fullstack AI first applications.

## Community

If you have any questions about anything related to Promptable or if you want to discuss with us and the community, you are welcome to join our **[discord](https://discord.gg/SYmACWTf6V)**.
