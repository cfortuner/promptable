import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";
import { OpenAI } from "@promptable/promptable";

const run = async (args: string[]) => {
  const apiKey = process.env.OPENAI_API_KEY || "";
  const openai = new OpenAI(apiKey);

  console.log(chalk.blue("Transcribing audio..."));

  const result = await openai.transcribe({
    filePath: "./data/test.m4a",
  });

  console.log(chalk.yellow(result.text));
};

export default run;
