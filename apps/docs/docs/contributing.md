# Contributing

We're very early and most of this is subject to change, but we'd love your help!

If you want to dev on the repo follow these instructions!

## What's inside?

This a Turborepo monorepo of tooling for Typescript developers building LLM apps.

It uses [pnpm](https://pnpm.io) as a package manager and includes the following packages/apps:

- `packages/promptable`: The Promptable Library for building LLM apps in Typescript / Javascript!
- `examples`: Examples using the Promptable.js library!
- `apps/docs`: The Promptable.js Docs
- `apps/web`: A nextjs app for visualizing Promptable.js steps.

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

In `apps/web` you'll find the nextjs app for visualizing Promptable.js Traces.

TODO: more info
