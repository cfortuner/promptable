import { Chain } from "@chains/Chain";
import { SequentialChain } from "@chains/SequentialChain";
import { ParallelChain } from "@chains/ParallelChain";
import { Step } from "@steps/Step";
import { PromptStep } from "@steps/PromptStep";
import { Prompt } from "@prompts/Prompt";
import {
  ModelProvider,
  ModelProviderType,
} from "@model-providers/ModelProvider";
import { OpenAI } from "@model-providers/OpenAI";
import utils from "@utils/index";
import z from "zod";
import { JSONParser, CSVParser, Parser } from "@prompts/Parser";
import * as common from "./common";

/** ideal api
 *
 * import promptable from "@promptable";
 *
 * 1. create your index / store
 *
 * react
 * <PromptableProvider>
 * </PromptableProvider>
 *
 * nodejs
 * const agent = promptable.create('agent', {})
 *
 * 2. use the hooks / functions
 * const { query, mutate } = usePromptable()
 *
 * agent.query('hello')
 *
 * 3. provide tools to your agents via the api:
 * const serp = promptable.tools.
 * agent.use()
 *
 *
 *
 */

export {
  Chain,
  SequentialChain,
  ParallelChain,
  Step,
  Prompt,
  PromptStep,
  Parser,
  JSONParser,
  CSVParser,
  ModelProvider,
  ModelProviderType,
  OpenAI,
  utils,
  common,
  z,
};
