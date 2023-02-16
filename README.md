# Promptable

Build fullstack AI apps in Typescript/Javascript.

## What is this?

Promptable is library that enables you to build powerful AI applications with LLMs and Embeddings providers such as OpenAI, Hugging Face, Cohere and Anthropic. It provides a flexible and extensible API that makes it easy to compose LLMs with data and tools to build complex applications quickly and easily.

With Promptable, you can combine LLMs with other powerful tools and data sources, such as databases and APIs, to create a wide range of AI applications.

**What is LLM?**

An LLM is a Large Language Model. It is a model that can generate text given a prompt. It is a type of AI that can be used to generate text, answer questions, and more.

**What is an Embedding?**

An Embedding is a vector representation of a piece of text. It is a type of AI that can be used to find similar pieces of text, search for text, and more.

> ! Right now the library is in early development and is very much experimental. Don't use this in production yet! The API is subject to change as we get feedback.

[Github Repo](https://github.com/cfortuner/promptable).
[Discord](https://discord.gg/SYmACWTf6V).
[Twitter](https://twitter.com/promptableai).

## Use Cases:

- 💬 Chatbots & Conversational AI
- ❓ Question Answering Bots
- ✍️ Writing Apps
- 🧑‍✈️ Copilot apps built with Chrome Extensions, VSCode Extensions, and more!
- 🔍 AI Semantic Search apps
- 🛠️ AI first Automations, Workflows and Tools
- 🤖 Autonomous Agents & Personal Assistants

### Features

- [Prompts](./apps/docs/docs/modules/prompts.md) for templating and formatting
- [Model Providers](./apps/docs/docs/modules/model-providers.md) for Text Generation and Embedding Generation
- [Embeddings](./apps/docs/docs/modules/embeddings.md) for creating Embeddings, Indexing and Search
- [Tracing](./apps/docs/docs/modules/tracing.md) for debugging your applications!
- [Chains](./apps/docs/docs/modules/chains.md) for composing LLMs and Embeddings with data and other tools.
- Utilities for working with text and data.
- More Coming Soon :)

## Install Library

`npm i promptable`

## Usage

See our docs for more info on how to use the library.
(Documentation)[https://docs-promptable.vercel.app/]

### Examples

To run an example, clone the repo and follow these steps
1. Copy contents of `/apps/web/.env.example` into a new file, `/apps/web/.env`
2. Copy contents of `/examples/.env.example` into a new file, `/examples/.env` and add your [OpenAI API Key](https://openai.com/api/) to the `OPENAI_API_KEY` field
3. Run the following commands:
```
pnpm i
pnpm dev
```
4. Run the following command in a different terminal window/tab:
   *NOTE: example names found in [/examples/src](https://github.com/cfortuner/promptable/tree/main/examples/src)
```
pnpm run example <example name>
```

## What's inside?

This a Turborepo monorepo of tooling for Typescript developers building LLM apps.

It uses [pnpm](https://pnpm.io) as a package manager and includes the following packages/apps:

- `packages/promptable`: The Promptable Library for building LLM apps in Typescript / Javascript!
- `examples`: Examples using the Promptable.js library!
- `apps/docs`: The Promptable.js Docs
- `apps/web`: A nextjs app for visualizing Promptable.js steps.
- `apps/nextjs-promptable`: A nextjs app starter kit with prebuilt features (ChatBot with Streaming, QA Bot etc.)
## Contributing

## Install and Run

Then to install run (at the root)

```
pnpm i

```

To install package in a single workspace

```

pnpm i <package> --filter <workspace>

```

First copy the `apps/web/.env.example` file to `apps/web/.env`.

Then, To develop all apps and packages, run the following command:

```

cd my-turborepo
pnpm run dev

```

This will start watching the files for changes.

### UI

See our [Docs](https://docs-promptable.vercel.app/docs/modules/tracing#tracing-ui).
