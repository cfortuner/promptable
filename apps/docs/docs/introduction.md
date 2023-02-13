---
sidebar_label: "Introduction"
---

# Introduction

Promptable is a Typescript library for building modern, typesafe, fullstack applications with LLMs.

Promptable consists of a collection of utilities and interfaces that help you build applications with LLMs. It is designed to be flexible and extensible so that you can use it with any LLM or Embeddings provider.

<div className="bg-purple-700 rounded-md p-6">
  <p><strong>Note!</strong> This project is still a work in progress and is very much experimental. Don't use this in production yet! The API is subject to change as we get feedback.</p>
</div>

### Features

The core features include:

- Prompt templating and formatting
- Model Providers for Text Generation and Embedding Generation
- Embedding Indexing and Search
- Documents, Text Splitters and Loaders
- Parsers for extracting data from text
- Step Tracing for debugging your applications!

### Web UI

To assist in debugging, we also provide a Tracing UI that helps you visualize the steps taken by the LLM to generate the output.

If you have any questions about anything related to Promptable or if you want to discuss with us and the community, you are welcome to join our **[discord](https://discord.gg/SYmACWTf6V)**.

## Motivation

Large Language models are emerging as a powerful tool to use for variety of tasks. With OpenAI models like GPT-3 only an API call away, it's become possible to build applications that use AI as a core software component for business logic, data processing, content generation and more. Traditionally, AI tooling has only been built in python to power backend systems, but with the success of ChatGPT, we have learned that the UI/UX of an app is just as important as the backend.

This project aims to provide a set of general tools for Typescript and Javascript developers to help them build fullstack AI first applications.
