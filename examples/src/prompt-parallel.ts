import dotenv from "dotenv";
dotenv.config();
import { OpenAI, Prompt, CharacterTextSplitter } from "promptable";

/**
 * Evaluate a poem on each paragraph
 */
export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  const openai = new OpenAI(apiKey);

  const text = `
Sports, what a way to have some fun
Competing in a game or two
The thrill of victory, or the agony of defeat
It all comes down to what you do

The camaraderie shared by teammates
The drive to work to be the best
Cheering crowds, a stadium alive
What an amazing way to test

Your will, your strength, your skill
The drive for greatness, it's all there
The thrill of running, jumping, and throwing
Athletes everywhere at their share

A reminder that we're all capable
Of more than we know, and`;

  const splitter = new CharacterTextSplitter("\n\n", {
    overlap: 0,
  });

  const chunks = splitter.splitText(text);

  console.log("Chunks");

  const evalPoemChunksPrompt = new Prompt(
    `Rate the following poem phrase on it's creativity:\n\nPoem:{{poem}}\n\n\nRating: Give the phrase a rating (1-5) and an explaination:`,
    ["poem"]
  );

  const evaluations = await Promise.all(
    chunks.map((chunk) =>
      openai.generate(evalPoemChunksPrompt, { poem: chunk })
    )
  );

  console.log(evaluations);
}
