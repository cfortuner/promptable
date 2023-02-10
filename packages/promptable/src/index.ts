import { chain } from "@steps/Chain";
import llm from "@steps/LLM";
import { Step, step } from "@steps/Step";
import { LLMCompletionStep } from "@steps/LLM";
import { Prompt, prompt } from "@prompts/Prompt";
import { ModelProvider, ModelProviderType } from "@providers/ModelProvider";

export const initPromptable = () => {
  return {
    chain,
    step,
    prompt,
  };
};

// Prebuild steps
export const steps = {
  llm,
  LLMCompletionStep,
};

// Prebuilt prompts
import * as prompts from "@prompts/prompts";
export { prompts };

// Providers
import { OpenAI } from "@providers/OpenAI";
export const providers = {
  OpenAI,
};

// Utils
import { TextSplitter, CharacterTextSplitter } from "@utils/TextSplitter";
import { unescapeStopTokens } from "@utils/unescape-stop-tokens";
import { injectVariables } from "@utils/inject-variables";
import { parseJsonSSE } from "@utils/parse-json-sse";
import { JSONParser, CSVParser, Parser } from "@prompts/Parser";
export const parsers = {
  JSONParser,
  CSVParser,
};
export const utils = {
  TextSplitter,
  Parser,
  CharacterTextSplitter,
  unescapeStopTokens,
  injectVariables,
  parseJsonSSE,
};

export { Step, Prompt, ModelProvider };
