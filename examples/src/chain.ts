import dotenv from "dotenv";
dotenv.config();
import { initPromptable, providers, steps } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

// configure your providers etc.
const p = initPromptable();

export default async function run() {
  const openai = new providers.OpenAI(apiKey);

  const writePoem = p.prompt("Write a poem about {{topic}}:", ["topic"]);
  const evalPoem = p.prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    ["poem"]
  );

  const chain = p.chain("Write and Evaluate poem");

  chain.sequence(
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
