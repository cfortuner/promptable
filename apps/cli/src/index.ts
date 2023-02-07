#!/usr/bin/env node

import chain from "./chain";
import parser from "./parser";
import textSplitter from "./textSplitter";
import chatbot from "./chatbot";
import chatbotWithInteractionMemory from "./chatbot_with_interaction_memory";
import dropboxQa from "./dropboxQa";

import { utils } from "promptable";
import { logger } from "./utils/Logger";

utils.logger.setLevel("debug");
utils.logger.setLogger(logger);

const commands: {
  [key: string]: () => Promise<any>;
} = {
  chain,
  parser,
  textSplitter,
  chatbot,
  chatbotWithInteractionMemory,
  dropboxQa
};

async function run(args: string[]) {
  console.log(commands)
  const command = args[0];
  if (commands[command]) {
    await commands[command]();
  } else {
    console.error(`Unrecognized command: ${command}`);
  }
}

run(process.argv.slice(2));

export { };
