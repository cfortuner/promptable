import dotenv from "dotenv";
dotenv.config();
import { Prompt, providers } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

export default async function run() {
  const openai = new providers.OpenAI(apiKey);

  const writePoemPrompt = new Prompt("Write a poem about {{topic}}:", [
    "topic",
  ]);
  const evalPoemPrompt = new Prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    ["poem"]
  );

  const poem = await openai.generate(writePoemPrompt, {
    topic: "hi",
  });

  const evaluation = openai.generate(evalPoemPrompt, {
    poem,
  });

  console.log(evaluation);
}
