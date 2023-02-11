import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import {
  OpenAI,
  Prompt,
  QAPrompt,
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
  const prompt = QAPrompt;

  const filepath = "./data/startup-mistakes.txt";
  const loader = new FileLoader(filepath);
  const splitter = new CharacterTextSplitter("\n");

  // load and split the documents
  const docs = loader.load();
  const chunks = splitter.splitText(docs.map((doc) => doc.content).join("\n"), {
    chunk: true,
  });

  // Run the Question-Answer prompt on each chunk
  const question = args[0] || "What is the most common mistake founders make?";

  console.log(chalk.blue.bold("\nRunning QA Example: startup-mistakes.txt"));
  console.log(chalk.white(`Question: ${question}`));

  for (const chunk of chunks) {
    const tokensUsed = openai.countTokens(
      prompt.format({ document: chunk, question })
    );

    console.log(
      `\n${chunk.substring(0, 100).trim()}...\n\n...${chunk
        .slice(-100)
        .trim()}\n` + chalk.gray(`${"Tokens: " + tokensUsed}`)
    );

    const answer = await openai.generate(prompt, {
      document: chunk,
      question,
    });

    console.log(chalk.greenBright(`Answer: ${answer}`));
  }
}
