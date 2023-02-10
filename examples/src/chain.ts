import dotenv from "dotenv";
dotenv.config();
import { initPromptable, providers, steps } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

// configure your providers etc.
const p = initPromptable();

export default async function run() {
  const openai = new providers.OpenAI(apiKey);

  const writePoemPrompt = p.prompt("Write a poem about {{topic}}:", ["topic"]);
  const evalPoemPrompt = p.prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    ["poem"]
  );

  const writePoem = steps.llm.completion("poem", {
    prompt: writePoemPrompt,
    provider: openai,
  });

  const evalPoem = steps.llm.completion("eval", {
    prompt: evalPoemPrompt,
    provider: openai,
  });

  const chain = p.chain(
    writePoem,
    p.step("map outputs", async ({ completion }) => {
      return {
        variables: {
          poem: completion,
        },
      };
    }),
    evalPoem
  );

  const result = await chain.run({
    variables: {
      topic: "Sports",
    },
  });

  console.log(result);
}
