import dotenv from "dotenv";
dotenv.config();
import { prompt, OpenAI } from "@promptable/promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

export default async function run(args: string[]) {
  const openai = new OpenAI(apiKey);

  const writePoemPromptText = prompt("Write a poem about {{topic}}:", {
    topic: "hi",
  });

  const { text: poem } = await openai.generate(writePoemPromptText);

  const evalPoemPromptText = prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    {
      poem,
    }
  );

  const { text: evaluation } = await openai.generate(evalPoemPromptText);

  console.log(evaluation);
}
