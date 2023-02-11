import fs from "fs";
import chalk from "chalk";
import { FileLoader, OpenAI, QAPrompt } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Simple example of using the OpenAI API count the tokens used in a prompt
 */
export default async function run(args: string[]) {
  const openai = new OpenAI(apiKey);
  const prompt = QAPrompt;

  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);
  let docs = loader.load();

  const promptText = prompt.format({ document: docs[0].content, question: "" });

  const tokensUsed = openai.countTokens(promptText);

  console.log(chalk.white(`Token Count`), chalk.green(tokensUsed));
}
