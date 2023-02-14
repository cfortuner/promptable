# Promptable 

Build fullstack AI apps in Typescript/Javascript. 

## What is this?

Promptable consists of a collection of utilities and interfaces that help you build applications with LLMs. It is designed to be flexible and extensible so that you can use it with any LLM or Embeddings provider.

The goal of this library is to provide a set of general tools for Typescript and Javascript developers to help them build fullstack AI first applications quickly and easily.

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

- [Prompts](./modules/prompts.md) for templating and formatting
- [Model Providers](./modules/model-providers.md) for Text Generation and Embedding Generation
- [Embeddings](./modules/embeddings.md) for creating Embeddings, Indexing and Search
- [Tracing](./modules/tracing.md) for debugging your applications!
- [Utilities](./modules/utilities.md) for working with text and data.

## Install Library

`npm i promptable`

## Usage

See our docs for more info on how to use the library.
(Documentation)[https://docs-promptable.vercel.app/]

### Examples

To run an example, clone the repo and run the following commands

```
pnpm i
pnpm dev
pnpm run example <example name>
```

## What's inside?

This a Turborepo monorepo of tooling for Typescript developers building LLM apps.

It uses [pnpm](https://pnpm.io) as a package manager and includes the following packages/apps:

- `packages/promptable`: The Promptable Library for building LLM apps in Typescript / Javascript!
- `examples`: Examples using the Promptable.js library!
- `apps/docs`: The Promptable.js Docs
- `apps/web`: A nextjs app for visualizing Promptable.js steps.

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

See our (Docs)[https://docs-promptable.vercel.app/docs/modules/tracing#tracing-ui]
