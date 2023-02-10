import { chain } from "@steps/Chain";
import llm from "@steps/LLM";
import { Step, step } from "@steps/Step";
import { Prompt, prompt } from "@prompts/Prompt";
import {
  ModelProvider,
  ModelProviderType,
} from "@model-providers/ModelProvider";
import { OpenAI } from "@model-providers/OpenAI";
import utils from "@utils/index";
import { JSONParser, CSVParser, Parser } from "@prompts/Parser";
import * as common from "./common";

export const initPromptable = () => {
  return {
    chain,
    step,
    prompt,
  };
};

const steps = {
  llm,
};

export {
  Step,
  steps,
  Prompt,
  Parser,
  JSONParser,
  CSVParser,
  ModelProvider,
  ModelProviderType,
  OpenAI,
  utils,
  common,
};
