import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { OpenAI, prompts } from "@promptable/promptable";

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

  const text = "This is a test";
  const tokensUsed = openai.countTokens(text);
  const response = await openai.generate(text);

  console.log("Tokens: ", tokensUsed);
  console.log(response);
};

export default run;
