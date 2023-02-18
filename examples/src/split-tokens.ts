import chalk from "chalk";
import { FileLoader, OpenAI, TokenSplitter } from "@promptable/server";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Simple example showing how to split text on tokens
 */
export default async function run(args: string[]) {
  const openai = new OpenAI(apiKey);

  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);

  // load doc
  let docs = await loader.load();

  const splitter = new TokenSplitter();

  const chunks = splitter.splitText(docs[0].content);

  // Count the tokens used in each chunk
  chunks.forEach((chunk, i) => {
    const tokensUsed = openai.countTokens(chunk);
    console.log(
      chalk.white(`Chunk`),
      chalk.blue(i),
      `Token Count`,
      chalk.greenBright(tokensUsed)
    );
  });
}
