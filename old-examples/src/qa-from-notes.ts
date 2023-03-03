import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { Splitters, Loaders, OpenAI, Templates } from "@promptable/promptable";

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
  const extractPrompt = Templates.ExtractText;
  const qaPrompt = Templates.QA;
  const summarizePrompt = Templates.Summarize;

  // Load the file
  const filepath = "./data/startup-mistakes.txt";
  const loader = new Loaders.FileLoader();
  const splitter = new Splitters.CharacterTextSplitter("\n");

  // load and split the documents
  let docs = await loader.loadTexts([filepath]);
  docs = splitter.splitDocuments(docs, {
    chunk: true,
  });

  // The Question to use for extraction
  const question = args[0] || "What is the most common mistake founders make?";

  console.log(chalk.blue.bold("\nRunning QA From Notes: startup-mistakes.txt"));
  console.log(chalk.white(`Question: ${question}`));

  // Run the Question-Answer prompt on each chunk asyncronously
  const notes = await Promise.all(
    docs.map((doc) => {
      const promptText = extractPrompt.build({
        document: doc.text,
        question,
      });

      return openai.generate(promptText);
    })
  );

  // note: selecting the most important notes
  // and summarizing them is really important
  // how do you avoid the token limit?
  const noteSummaries = await Promise.all(
    notes.map((note) => {
      const formattedPrompt = summarizePrompt.build({
        document: note.text,
      });

      return openai.generate({ text: formattedPrompt.text });
    })
  );

  // TODO: Is there a way to handle this for the user?
  const document = `NOTES:\n${splitter.mergeText(
    noteSummaries.map((sum) => sum.text),
    "\n---\n"
  )}`;

  const tokenCount = openai.countTokens(
    qaPrompt.build({
      question,
      document,
    }).text
  );
  console.log("token count ", tokenCount);

  // note: it's difficult to ensure that your prompt doesn't exceed the token limit
  // note: having openai do the formatting is bad and we should change it
  // note: joining your notes together is the most basic selector, we should add one
  // & formatting the notes is very simple. but useful.
  // generally just making it easy to format prompts.

  const qaPromptText = qaPrompt.build({
    question,
    document,
  });

  const { text: answer } = await openai.generate(qaPromptText);

  console.log(chalk.greenBright(`Answer: ${answer}`));
};

export default run;
