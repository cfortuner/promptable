import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, Prompt, prompts } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Run QA on a Document
 *
 * Adds the entire document to the prompt.
 *
 * @param args
 */
const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);
  const prompt = prompts.QAPrompt;

  // Load the file
  const filepath = "./data/beyond-smart.txt";
  let doc = fs.readFileSync(filepath, "utf8");

  // Run the Question-Answer prompt on the document.
  const question = args[0] || "What does Paul Graham mean by Beyond Smart??";

  console.log(chalk.blue.bold("\nRunning Simple QA: beyond-smart.txt"));
  console.log(chalk.white(`Question: ${question}`));

  const tokensUsed = openai.countTokens(
    prompt.format({ document: doc, question })
  );

  console.log(
    `\n${doc.substring(0, 100).trim()}...\n\n...${doc.slice(-100).trim()}\n` +
      chalk.gray(`${"Tokens: " + tokensUsed}`)
  );

  const answer = await openai.generate(prompt, {
    document: doc,
    question,
  });

  console.log(chalk.greenBright(`Answer: ${answer}`));
};

export default run;
