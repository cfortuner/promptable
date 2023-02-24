#!/usr/bin/env node

import * as promptable from "@promptable/promptable";
import yargs from "yargs";

const run = async () => {
  const options = await yargs
    .usage("Usage: $0 [options]")
    .option("prompts", {
      alias: "p",
      describe: "Comma-separated list of prompts to load",
      type: "string",
    })
    .demandOption(["prompts"])
    .help("h")
    .alias("h", "help").argv;

  const promptIds = options.prompts.split(",");

  console.log("Loading prompts:", promptIds);
  const prompts = promptIds.map((pid) => ({
    id: pid,
  }));
  await promptable.loadPromptablePrompts({ prompts });
};

run();
