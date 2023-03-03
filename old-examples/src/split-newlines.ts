import chalk from "chalk";
import { Splitters } from "@promptable/promptable";

/**
 * Simple example showing how to split text on new lines
 */
export default async function run(args: string[]) {
  const splitter = new Splitters.CharacterTextSplitter("\n");
  const text = `
  Sports, what a way to have some fun
  Competing in a game or two
  The thrill of victory, or the agony of defeat
  It all comes down to what you do
  
  The camaraderie shared by teammates
  The drive to work to be the best
  Cheering crowds, a stadium alive
  What an amazing way to test
  
  Your will, your strength, your skill
  The drive for greatness, it's all there
  The thrill of running, jumping, and throwing
  Athletes everywhere at their share
  
  A reminder that we're all capable
  Of more than we know, and`;

  const splits = splitter.splitText(text);
  console.log(chalk.white(`lines:`));
  console.log(JSON.stringify(splits, undefined, 4));
}
