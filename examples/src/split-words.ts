import chalk from "chalk";
import { CharacterTextSplitter } from "promptable";

/**
 * Simple example showing how to split text on tokens
 */
export default async function run(args: string[]) {
  const splitter = new CharacterTextSplitter(" ");
  const words = splitter.splitText("Hello world! How are you?");
  console.log(chalk.white(`Words:`));
  console.log(chalk.green(JSON.stringify(words, undefined, 4)));
}
