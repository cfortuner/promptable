import { Prompt, prompt } from "@prompts/Prompt";
import { ModelProvider } from "@providers/ModelProvider";

export interface Document {
  content: string;
  meta: Record<string, any>;
}

// Prebuilt prompts
export * from "@prompts/prompts";

// Providers
import { OpenAI } from "@providers/OpenAI";
export const providers = {
  OpenAI,
};

// Loaders
import { Loader, FileLoader } from "@loaders/index";
export { Loader, FileLoader };

// Utils

// Parsing
import { JSONParser, CSVParser, Parser, ListParser } from "@utils/Parser";
export type { Parser };
export const parsers = {
  JSONParser,
  CSVParser,
  ListParser,
};

// Splitting
import {
  TextSplitter,
  CharacterTextSplitter,
  SentenceTextSplitter,
} from "@utils/TextSplitter";
export const splitters = {
  TextSplitter,
  CharacterTextSplitter,
  SentenceTextSplitter,
};

import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import { injectVariables } from "@utils/inject-variables";
import { parseJsonSSE } from "@utils/parse-json-sse";
export const utils = {
  splitters,
  parsers,
  CharacterTextSplitter,
  unescapeStopTokens,
  injectVariables,
  parseJsonSSE,
};

export { Prompt, ModelProvider };
