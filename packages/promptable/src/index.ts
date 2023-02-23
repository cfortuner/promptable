export {
  LLMChain,
  MemoryLLMChain,
  CombineDocumentsChain,
  QAChain,
} from "@chains/index";
export { BufferedChatMemory } from "src/memories/BufferedChatMemory";

export interface Document {
  content: string;
  meta: Record<string, any>;
}

// Prebuilt prompts
import { Prompt, PromptVariables, prompt } from "@prompts/Prompt";
import * as prompts from "@prompts/prompts";
export { prompts };
export { Prompt, prompt };
export type { PromptVariables };

// Providers
import {
  ModelProvider,
  ModelProviderType,
  CreateCompletionRequest,
  CompletionsModelProvider,
  CreateEmbeddingsRequest,
  EmbeddingsModelProvider,
  CreateCompletionResponse,
  CreateEmbeddingsResponse,
  Tokenizer,
} from "@providers/ModelProvider";
import { OpenAI, GenerateCompletionOptions } from "@providers/OpenAI";
export { OpenAI };
export type {
  GenerateCompletionOptions,
  ModelProvider,
  ModelProviderType,
  CreateCompletionRequest,
  CompletionsModelProvider,
  CreateEmbeddingsRequest,
  EmbeddingsModelProvider,
  CreateCompletionResponse,
  CreateEmbeddingsResponse,
  Tokenizer,
};

// Embeddings
import { Embeddings } from "./embeddings";
export { Embeddings };

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

import { injectVariables } from "@utils/inject-variables";
import { parseJsonSSE } from "@utils/parse-json-sse";
import {
  mergeDocumentsWithSeparator,
  mergeDocumentsTruncated,
} from "@utils/merge-documents";
export const utils = {
  injectVariables,
  parseJsonSSE,
  mergeDocumentsWithSeparator,
  mergeDocumentsTruncated,
};
