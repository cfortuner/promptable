import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, prompts } from "@promptable/promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Summarize a document naively.
 *
 * @param args
 */
const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);
  const prompt = prompts.summarize();

  // Load the file
  const filepath = "./data/beyond-smart.txt";
  let doc = fs.readFileSync(filepath, "utf8");

  console.log(chalk.blue.bold("\nRunning Summarize Example: beyond-smart.txt"));

  const tokensUsed = openai.countTokens(prompt.format({ document: doc }));

  console.log(
    `\n${doc.substring(0, 100).trim()}...\n\n...${doc.slice(-100).trim()}\n` +
      chalk.gray(`${"Tokens: " + tokensUsed}`)
  );

  const promptText = prompt.format({
    document: doc,
  });
  const answer = await openai.generate(promptText);

  console.log(chalk.greenBright(`Summary: ${answer}`));
};

export default run;
