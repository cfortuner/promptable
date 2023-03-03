import dotenv from "dotenv";
dotenv.config();
import { OpenAI, Prompt, Splitters } from "@promptable/promptable";

/**
 * Evaluate a poem on each paragraph
 */
export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  const openai = new OpenAI(apiKey);

  const text = `Sports, what a way to have some fun\nCompeting in a game or two\nThe thrill of victory, or the agony of defeat\nIt all comes down to what you do\n\nThe camaraderie shared by teammates\nThe drive to work to be the best\nCheering crowds, a stadium alive\nWhat an amazing way to test\n\nYour will, your strength, your skill\nThe drive for greatness, it's all there\nThe thrill of running, jumping, and throwing\nAthletes everywhere at their share\n\nA reminder that we're all capable\nOf more than we know, and`;

  const splitter = new Splitters.CharacterTextSplitter("\n\n", {
    overlap: 0,
  });

  const chunks = splitter.splitText(text);

  const evaluations = await Promise.all(
    chunks.map((chunk) => {
      const evalPoemChunksPrompt = new Prompt(
        `Rate the following poem phrase on it's creativity:\n\nPoem:{{poem}}\n\n\nRating: Give the phrase a rating (1-5) and an explaination:`,
        {
          poem: chunk,
        }
      );

      return openai.generate(evalPoemChunksPrompt);
    })
  );

  console.log(evaluations.map((e) => e.text));
}
