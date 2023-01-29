import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import {
  PromptStep,
  SequentialChain,
  OpenAI,
  z,
  Prompt,
  JSONParser,
  CSVParser,
} from "promptable";

export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  // Run the steps sequentially

  const openai = new OpenAI(apiKey);

  const jsonParser = new JSONParser();

  const jsonPrompt = new Prompt(
    `Fill in this Typescript obj with JSON:\n\n
    {
        name: string,
        date: Date,
    }
    `,
    [],
    jsonParser
  );

  const step = new PromptStep({
    prompt: jsonPrompt,
    provider: openai,
    inputNames: [],
    outputNames: ["json"],
  });

  await step.run({
    steps: [],
    inputs: {},
  });

  console.log(JSON.stringify(step.calls));
}
