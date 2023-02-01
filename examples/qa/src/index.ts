/**
 * Question Answering Example
 *
 * Given a long document, split it into chunks and run a Question Answer prompt on each chunk
 */
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, Prompt } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

// Load the file
const cwd = process.cwd();
const filepath = `${cwd}/data/startup-mistakes.txt`;
let doc = fs.readFileSync(filepath, "utf8");

// Prompt and Model Provider
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

// Split the doc by the separator
const separator = "\n\n";
const texts = doc.split(separator);

const chunkSize = 1000;
const chunkOverlap = 100;

// Create chunks to send to the model
const chunks = texts.reduce((chunks: string[], text) => {
  let chunk = chunks.pop() || "";
  const chunkLength = openai.countTokens(chunk);
  if (chunkLength >= chunkSize + chunkOverlap) {
    chunks.push(chunk);
    chunk = "";
  }
  chunk = chunk === "" ? text : chunk + separator + text;
  chunks.push(chunk);
  return chunks;
}, []);

// Run the Question-Answer prompt on each chunk
const question = "What is the most common mistake founders make?";

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
