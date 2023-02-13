import dotenv from "dotenv";
dotenv.config();
import { Prompt, OpenAI } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

export default async function run() {
  const openai = new OpenAI(apiKey);

  const writePoemPromptText = new Prompt("Write a poem about {{topic}}:", [
    "topic",
  ]).format({
    topic: "hi",
  });

  const poem = await openai.generate(writePoemPromptText);

  console.log(poem);
}
