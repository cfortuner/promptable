import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import {
  OpenAI,
  Prompt,
  prompts,
  FileLoader,
  CharacterTextSplitter,
} from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Run QA on a Document split into chunks.
 *
 * Each chunk is sent to the model as a separate request.
 *
 * @param args
 */
export default async function run(args: string[]) {
  const openai = new OpenAI(apiKey);
  const prompt = prompts.QA();

  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);
  const splitter = new CharacterTextSplitter("\n");

  // load and split the documents
  let docs = await loader.load();
  docs = splitter.splitDocuments(docs, {
    chunk: true,
  });

  // Run the Question-Answer prompt on each chunk
  const question = args[0] || "What is the most common mistake founders make?";

  console.log(chalk.blue.bold("\nRunning QA Example: startup-mistakes.txt"));
  console.log(chalk.white(`Question: ${question}`));

  for (const doc of docs) {
    const tokensUsed = openai.countTokens(
      prompt.format({ document: doc.content, question })
    );

    console.log(
      `\n${doc.content.substring(0, 100).trim()}...\n\n...${doc.content
        .slice(-100)
        .trim()}\n` + chalk.gray(`${"Tokens: " + tokensUsed}`)
    );

    const promptText = prompt.format({
      document: doc.content,
      question,
    });

    const answer = await openai.generate(promptText);

    console.log(chalk.greenBright(`Answer: ${answer}`));
  }
}
