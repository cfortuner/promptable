---
sidebar_label: "Prompts"
---

# Prompts

Prompts are utility classes for formatting text for Text Generation. They allow you to create templates for your inputs, and they allow you to parse the outputs.

## Creating a Prompt

```ts title ="examples/simple-prompt.ts"
const openai = new OpenAI(apiKey);

const writePoemPrompt = new Prompt(
  // your instructions go here
  "Write a poem about {{topic}}:".trim(),
  [
    // variable names go here
    "topic",
  ]
);
```

## Generating Text using a Prompt

```ts
// format the prompt with your variables
const promptText = writePoemPrompt.format({
  topic: "hi",
});

const poem = await openai.generate(promptText);
```

## Parsing Outputs

You can parse a prompt to get the variables.

```ts title ="examples/parsing.ts"
const promptText = prompt.format({
  data,
  type: `{
        meeting_type: string, 
        Date: Date,
        Location: string,
        invitee_name: string,
        invitee_email: string,
    }`,
});

const json = await openai.generate(promptText);

const output = prompt.parse(json);
```

## Prebuilt Prompts

Promptable comes with a few prebuilt prompts that you can use.

```ts
import { prompts } from "@promptable/promptable";

const qaPrompt = prompts.QA();
const extractTextPrompt = prompts.extractText();
const extractJSONPrompt = prompts.extractJSON();
const summarizePrompt = prompts.summarize();
```
