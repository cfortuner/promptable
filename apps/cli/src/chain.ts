import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { PromptStep, SequentialChain, OpenAI, z, Prompt } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "missing";

// Run the steps sequentially

export default async function run() {
  const openai = new OpenAI(apiKey);

  const poemPrompt = new Prompt("Write a poem about {{topic}}:", ["topic"]);
  const evalPrompt = new Prompt(
    "Rate the following poem on it's creativity\n{{poem}}\nRating",
    ["poem"]
  );

  const chain = new SequentialChain("Second");
  await chain.run({
    // The steps in the chain
    steps: [
      new PromptStep({
        prompt: poemPrompt,
        provider: openai,
        inputNames: ["topic"],
        outputNames: ["poem"],
      }),
      new PromptStep({
        prompt: evalPrompt,
        provider: openai,
        inputNames: ["poem"],
        outputNames: ["eval"],
      }),
    ],
    // The inputs to the chain
    inputs: {
      topic: "Sports",
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
