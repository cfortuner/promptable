# Promptable (Langchain + GPT Index for Typescript)

Build fullstack AI apps in Typescript/Javascript.

## What is this?

This library provides simple interfaces and prebuilt components for building applications using LLMs and Embeddings. It is designed to be flexible and extensible so that you can use it with any Model Provider.

The goal of this library is to provide a set of general tools for Typescript and Javascript developers to help them build fullstack AI first applications quickly and easily.

> ! Right now the library is in early development and is very much experimental. Don't use this in production yet! The API is subject to change as we get feedback.

## Install Library

`npm i promptable`

## Usage

See our docs for more info on how to use the library.
documentation: https://docs.promptable.ai

### Examples

See `examples/README.md` for more info on running examples.

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

todo
