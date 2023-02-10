import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { initPromptable, OpenAI, steps } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

// configure your providers etc.
const p = initPromptable();

export default async function run() {
  const openai = new OpenAI(apiKey);

  const writePoem = p.prompt("Write a poem about {{topic}}:", ["topic"]);
  const evalPoem = p.prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    ["poem"]
  );

  const chain = p.chain("Write and Evaluate poem");

  chain.pipe(
    steps.llm.completion("poem", {
      prompt: writePoem,
      provider: openai,
    }),
    p.step("map outputs", async ({ completion }) => {
      return {
        variables: {
          poem: completion,
        },
      };
    }),
    steps.llm.completion("eval", {
      prompt: evalPoem,
      provider: openai,
    })
  );

  const result = await chain.run({
    variables: {
      topic: "Sports",
    },
  });

  console.log(result);

  console.log("FINISHED");
}
