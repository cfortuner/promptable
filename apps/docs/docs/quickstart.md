---
sidebar_label: "Quickstart"
---

# Quickstart

## Installation

```bash title='terminal'
npm i promptable
```

## Provider Setup

If you want to use a Model Provider like OpenAI, you must first create an api key.

Create your api key:

[Create a OpenAI API Key](https://platform.openai.com/account/api-keys)

Once you have it, you can configure promptable by creating a `.env` file in the root of your project and adding your provider's API key to it.

```bash title='.env'
OPENAI_API_KEY=<your api key>
```

## Usage

- Run `cd ./your_project_name`
- Run `npm i` or `pnpm i` or `yarn install`
- Run `npm run dev` or `pnpm dev` or `yarn dev` to start the development server on `http://localhost:8080`
- Edit `index.ts` to start developing your server

For more information on how to use create-bridge-app, you can review the create-bridge-app [documentation](https://www.npmjs.com/package/create-bridge-app).

## Contributing

See the [contributing guide](./contributing.md) to learn how to contribute to the repository and the development workflow.
