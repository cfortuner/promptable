import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import {
  PromptStep,
  SequentialChain,
  OpenAI,
  z,
  Prompt,
  utils,
  ParallelChain,
} from "promptable";

export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  // Run the steps sequentially

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

  const splitter = new utils.CharacterTextSplitter("\n\n", {
    chunkSize: 50,
    overlap: 0,
  });

  const chunks = splitter.splitText(text);

  const evalPoemChunksPrompt = new Prompt(
    `Rate the following poem phrase on it's creativity:\n\nPoem:{{poem}}\n\n\nRating: Give the phrase a rating (1-5) and an explaination:`,
    ["poem"]
  );

  const chain = new ParallelChain("Evaluate Poem Segments");

  await chain.run({
    // The steps in the chain
    steps: chunks.map((chunk, i) => {
      return new PromptStep({
        name: "Eval Poem Phrase",
        prompt: evalPoemChunksPrompt,
        provider: openai,
        inputNames: ["phrase"],
        outputNames: ["eval"],
      });
    }),

    inputs: {
      parallelInputs: chunks.map((chunk) => {
        return {
          phrase: chunk,
        };
      }),
    },
  });

  const chainData = chain.serialize();

  await axios.post("http://localhost:3000/api/chains", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      chain: chainData,
    },
  });

  console.log("FINISHED");
}
