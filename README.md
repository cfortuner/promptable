# Promptable.js (Langchain + GPT Index for Typescript)

⚡ Build fullstack AI apps in Typescript/Javascript. ⚡

## What is this?

A simple, lightweight, and flexible library for building prompt engineering pipelines in Typescript/Javascript.

## What's inside?

This a monorepo of tooling for Typescript developers building LLM apps.

It uses [pnpm](https://pnpm.io) as a package manager and includes the following packages/apps:

- `packages/promptable`: The Promptable Library for building LLM apps in Typescript / Javascript!
- `apps/cli`: The Promptable CLI tool (for running examples locally)
- `apps/docs`: a Docusaurus docs site
- `apps/web`: A nextjs app for visulizing / debugging chains!

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Install and Run

To install run (at the root)

```
pnpm i
```

To install package in a single workspace

```
pnpm i <package> --filter <workspace>
```

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm run dev
```

This will start watching the files for changes.

### Run Examples

To make it easy to test the library, run the `cli`:

1. copy the `.env.example` file to `.env` and add your keys

```
OPENAI_API_KEY=<your openai key>
```

2. Start the dev script

```
pnpm run start --filter examples
```

### UI

todo

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
