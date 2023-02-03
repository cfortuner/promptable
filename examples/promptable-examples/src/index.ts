#!/usr/bin/env node

import chain from "./chain";
import parser from "./parser";
import textSplitter from "./textSplitter";
import semanticSearch from "./semanticSearch";

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
  semanticSearch,
};

async function run(args: string[]) {
  const command = args[0];
  if (commands[command]) {
    await commands[command]();
  } else {
    console.error(`Unrecognized command: ${command}`);
  }
}

run(process.argv.slice(2));

export {};
