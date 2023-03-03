import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, Templates } from "@promptable/promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Run QA on a Document split into chunks.
 *
 * Each chunk is sent to the model as a separate request.
 *
 * @param args
 */
const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);

  // Load the file
  const filepath = "./data/startup-mistakes.txt";
  let doc = fs.readFileSync(filepath, "utf8");

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

  console.log(
    chalk.blue.bold("\nRunning Summarize Chunks: startup-mistakes.txt")
  );

  // summarize each chunk
  const summaries = await Promise.all(
    chunks.map((chunk) => {
      return openai.generate(
        Templates.Summarize.build({
          document: chunk,
        })
      );
    })
  );

  // output
  summaries.forEach((sum, i) => {
    console.log(
      chalk.blue(`
    \n
    Chunk: ${chunks[i].slice(0, 50)}... 
    `),
      chalk.greenBright(`
    Summary: ${sum.text.slice(0, 200)}...`)
    );
  });
};

export default run;
