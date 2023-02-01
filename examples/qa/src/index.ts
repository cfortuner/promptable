/**
 * Question Answering Example
 *
 * Given a long document, split it into chunks and run a Question Answer prompt on each chunk
 */
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, Prompt, utils } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

// 1. Load the file
const cwd = process.cwd();
const filepath = `${cwd}/data/startup-mistakes.txt`;
let doc = fs.readFileSync(filepath, "utf8");

// 2. Create the prompt and model provider
const openai = new OpenAI(apiKey);
const prompt = new Prompt(
  `
Given the following document, answer the question if you can.
If you don\'t have enough information, don't return anything.
Document:
{{document}}

Question:
{{question}}

Answer:`.trim(),
  ["document", "question"]
);

// 3. Split the text into chunks (to fit within token limit.)
const textSplitter = new utils.CharacterTextSplitter("\n\n", {
  chunkSize: 1000,
  overlap: 100,
});
const chunks = textSplitter.splitText(doc);

// 4. Set the question
const question = "What is the most common mistake founders make?";

// 5. For each chunk, run the question prompt to get an answer

console.log(chalk.blue.bold("\nRunning QA Example"));
console.log(chalk.blue(`\nDocument: startup-mistakes.txt`));
console.log(chalk.white(`Question: ${question}`));

const answers = [];
for (const chunk of chunks) {
  console.log(`\n${chunk.substring(0, 100)}...`);
  const answer = await openai.generate(prompt, {
    document: chunk,
    question,
  });

  answers.push(answer);
  console.log(chalk.greenBright(`Answer: ${answer}`));
}
