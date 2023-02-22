import dotenv from "dotenv";
dotenv.config();
import { Prompt, OpenAI } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

export default async function run() {
  const openai = new OpenAI(apiKey);

  const writePoemPrompt = new Prompt("Write a poem about {{topic}}:", [
    "topic",
  ]);

  const poem = await openai.generate({
    prompt: writePoemPrompt,
    variables: { topic: "hi" },
  });

  console.log(poem);
}
