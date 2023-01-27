#!/usr/bin/env node

import chain from "./chain";
import parser from "./parser";
import textSplitter from "./textSplitter";

const commands: {
  [key: string]: () => Promise<any>;
} = {
  chain,
  parser,
  textSplitter,
};

async function run(args: string[]) {
  console.log("Hello, world!");
  const command = args[0];
  if (commands[command]) {
    await commands[command]();
  } else {
    console.error(`Unrecognized command: ${command}`);
  }
}

run(process.argv.slice(2));

export {};
