import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, QAExtractPrompt, QAPrompt } from "promptable";

const apiKey = process.env.OPENAI_API_KEY || "";

/**
 * Run QA on a Document by first extracting the most important notes,
 *
 * then running a Question Answer prompt on each note.
 *
 * @param args
 */
const run = async (args: string[]) => {
  const openai = new OpenAI(apiKey);
  const extractPrompt = QAExtractPrompt;
  const qaPrompt = QAPrompt;

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

  // The Question to use for extraction
  const question = args[0] || "What is deadliest mistake founders make?";

  console.log(chalk.blue.bold("\nRunning QA Extraction: startup-mistakes.txt"));
  console.log(chalk.white(`Question: ${question}`));

  // Run the Question-Answer prompt on each chunk asyncronously
  const notes = await Promise.all(
    chunks.map((chunk) => {
      return new Promise(async (r) => {
        const note = await openai.generate(extractPrompt, {
          document: chunk,
          question,
        });

        r({
          chunk,
          note,
        });
      });
    })
  );

  // Run the Question-Answer prompt on the list of notes
  const answer = await openai.generate(qaPrompt, {
    question,
    document: "NOTES\n" + notes.map((n: any) => n.note).join("\n---\n"),
  });

  console.log(chalk.greenBright(`Answer: ${answer}`));
};

export default run;
