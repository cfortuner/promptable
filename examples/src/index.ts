#!/usr/bin/env node

import promptSimple from "./prompt-simple";
import promptSequential from "./prompt-sequential";
import promptParallel from "./prompt-parallel";

import embeddingsCreate from "./embeddings-create";
import embeddings from "./embeddings";
import embeddingsQA from "./embeddings-qa";
import embeddingsSearch from "./embeddings-search";

import qaSimple from "./qa-simple";
import qaChunks from "./qa-chunks";
import qaExtract from "./qa-extract";
import qaFromNotes from "./qa-from-notes";

import summarize from "./summarize";
import summarizeChunks from "./summarize-chunks";
import summarizeRecursive from "./summarize-recursive";

import parseJson from "./parse-json";
// import parseCSV from "./parse-csv";

import countTokens from "./count-tokens";

import splitNewlines from "./split-newlines";
import splitParagraphs from "./split-paragraphs";
import splitSentences from "./split-sentences";
import splitTokens from "./split-tokens";
import splitWords from "./split-words";

import chunkSentences from "./chunk-sentences";

import streamCompletions from "./stream-completions";

import tracing from "./tracing";
import tracingWeb from "./tracing-web";
import tracingWebPrompt from "./tracing-web-prompt";

import chainSimple from "./chain-simple";
import chainMemory from "./chain-memory";
import chainMultiMemory from "./chain-multi-memory";
import chainCombineDocuments from "./chain-combine-documents";
import chainSummarizeDocuments from "./chain-summarize-documents";
import chainQuestionAnswer from "./chain-question-answer";

import webSearchAndGenerate from "./web-search-and-generate";

// Add examples here!

const examples = {
  "prompt-simple": promptSimple,
  "prompt-sequential": promptSequential,
  "prompt-parallel": promptParallel,

  embeddings: embeddings,
  "embeddings-create": embeddingsCreate,
  "embeddings-qa": embeddingsQA,
  "embeddings-search": embeddingsSearch,

  "qa-simple": qaSimple,
  "qa-chunks": qaChunks,
  "qa-extract": qaExtract,
  "qa-from-notes": qaFromNotes,

  summarize: summarize,
  "summarize-chunks": summarizeChunks,
  "summarize-recursive": summarizeRecursive,

  "parse-json": parseJson,
  // disabled until we can figure out how to get the CSV parser to work
  // "parse-csv": parseCSV,

  "count-tokens": countTokens,

  "split-newlines": splitNewlines,
  "split-paragraphs": splitParagraphs,
  "split-sentences": splitSentences,
  "split-tokens": splitTokens,
  "split-words": splitWords,

  "chunk-sentences": chunkSentences,

  "stream-completions": streamCompletions,

  tracing,
  "tracing-web": tracingWeb,
  "tracing-web-prompt": tracingWebPrompt,

  "chain-simple": chainSimple,
  "chain-memory": chainMemory,
  "chain-multi-memory": chainMultiMemory,
  "chain-combine-documents": chainCombineDocuments,
  "chain-summarize-documents": chainSummarizeDocuments,
  "chain-question-answer": chainQuestionAnswer,

  "web-search-and-generate": webSearchAndGenerate,
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
