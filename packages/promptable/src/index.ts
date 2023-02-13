import { Prompt } from "@prompts/Prompt";
import { ModelProvider } from "@providers/ModelProvider";

export interface Document {
  content: string;
  meta: Record<string, any>;
}

import { Embeddings } from "./embeddings";
export { Embeddings };

// Prebuilt prompts
export * from "@prompts/prompts";

// Providers
import { OpenAI } from "@providers/OpenAI";
export { OpenAI };

// Loaders
import { Loader, FileLoader } from "@loaders/index";
export type { Loader };
export { FileLoader };

// Parsing
import { JSONParser, CSVParser, Parser, ListParser } from "@prompts/Parser";
export type { Parser };
export { JSONParser, CSVParser, ListParser };

// Splitting
import {
  TextSplitter,
  CharacterTextSplitter,
  SentenceTextSplitter,
  TokenSplitter,
} from "@utils/TextSplitter";
export {
  TokenSplitter,
  TextSplitter,
  CharacterTextSplitter,
  SentenceTextSplitter,
};

import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import { injectVariables } from "@utils/inject-variables";
import { parseJsonSSE } from "@utils/parse-json-sse";
export const utils = {
  unescapeStopTokens,
  injectVariables,
  parseJsonSSE,
};

export { Prompt, ModelProvider };

import { graphTraces, trace, setTraceConfig } from "./tracing";
import type { Trace } from "./tracing";
export { graphTraces, trace, setTraceConfig, Trace };
