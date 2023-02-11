#!/usr/bin/env node

import simplePrompt from "./simple-prompt";
import multiplePrompts from "./multiple-prompts";
import parser from "./parser";
import textSplitter from "./textSplitter";
import semanticSearch from "./semantic-search";
import qaSimple from "./qa-simple";
import qaChunks from "./qa-chunks";
import qaExtract from "./qa-extract";
import qaFromNotes from "./qa-from-notes";
import summarize from "./summarize";
import summarizeChunks from "./summarize-chunks";
import summarizeRecursive from "./summarize-recursive";
import extractJson from "./extract-json";
import extractCSV from "./extract-csv";
import embeddings from "./embeddings";
import embeddingsQA from "./embeddings-qa";

// Add examples here!

const examples = {
  simplePrompt: simplePrompt,
  multiplePrompts: multiplePrompts,
  parser,
  textSplitter,
  semanticSearch,
  "qa-simple": qaSimple,
  "qa-chunks": qaChunks,
  "qa-extract": qaExtract,
  "qa-from-notes": qaFromNotes,

  summarize: summarize,
  "summarize-chunks": summarizeChunks,
  "summarize-recursive": summarizeRecursive,

  "extract-json": extractJson,
  "extract-csv": extractCSV,

  embeddings: embeddings,
  "embeddings-qa": embeddingsQA,
};

const isExample = (arg: string): arg is keyof typeof examples =>
  arg in examples;

async function run(args: string[]) {
  const example = args[0];
  const params = args.slice(1);

  if (!isExample(example)) {
    console.error(`Unrecognized example: ${example}`);
    return;
  }

  await examples[example](params);
}

run(process.argv.slice(2));

export {};
