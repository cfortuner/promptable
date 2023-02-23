import chalk from "chalk";
import { CharacterTextSplitter } from "@promptable/promptable";

/**
 * Simple example showing how to split text on paragraphs
 */
export default async function run(args: string[]) {
  const splitter = new CharacterTextSplitter("\n\n");
  const text =
    "Sports, what a way to have some fun\nCompeting in a game or two\nThe thrill of victory, or the agony of defeat\nIt all comes down to what you do\n\nThe camaraderie shared by teammates\nThe drive to work to be the best\nCheering crowds, a stadium alive\nWhat an amazing way to test\n\nYour will, your strength, your skill\nThe drive for greatness, it's all there\nThe thrill of running, jumping, and throwing\nAthletes everywhere at their share\n\nA reminder that we're all capable\nOf more than we know.";

  const paragraphs = splitter.splitText(text);
  console.log(chalk.bold.black(`paragraphs:`));
  console.log(chalk.green(JSON.stringify(paragraphs, undefined, 4)));
}
