import dotenv from "dotenv";
dotenv.config();
import { Prompt, OpenAI } from "@promptable/server";

const apiKey = process.env.OPENAI_API_KEY || "missing";

export default async function run() {
  const openai = new OpenAI(apiKey);

  const writePoemPromptText = new Prompt("Write a poem about {{topic}}:", [
    "topic",
  ]).format({
    topic: "hi",
  });

  const poem = await openai.generate(writePoemPromptText);

  const evalPoemPromptText = new Prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    ["poem"]
  ).format({
    poem,
  });

  const evaluation = await openai.generate(evalPoemPromptText);

  console.log(evaluation);
}
