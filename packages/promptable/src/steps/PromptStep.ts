import { SequentialChain } from "@chains/SequentialChain";
import { Prompt } from "@prompts/Prompt";
import { ModelProvider } from "../model-providers/ModelProvider";
import { z } from "zod";
import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";
import { logger } from "@utils/Logger";

interface PromptStepInput extends StepInput {}
interface PromptStepOutput extends StepOutput {}

interface PromptStepArgs<
  T extends PromptStepInput,
  J extends PromptStepOutput
> {
  name?: string;
  prompt: Prompt;
  provider: ModelProvider;
  inputNames: (keyof T)[];
  outputNames: (keyof J)[];
}

export class PromptStep<
  T extends PromptStepInput,
  J extends PromptStepOutput
> extends Step<T, J> {
  prompt: Prompt;
  provider: ModelProvider;
  inputNames: (keyof T)[] = [];
  outputNames: (keyof J)[] = [];

  constructor({
    name,
    prompt,
    provider,
    inputNames,
    outputNames,
  }: PromptStepArgs<T, J>) {
    super(name || "Prompt");
    this.prompt = prompt;
    this.provider = provider;
    this.inputNames = inputNames;
    this.outputNames = outputNames;

    // Define the zod schemas for validating inputs and outputs
    this.inputs(
      //@ts-expect-error
      inputNames.reduce((acc, name) => {
        return acc.merge(
          z.object({
            [name]: z.string(),
          })
        );
      }, z.object({}))
    );

    this.outputs(
      //@ts-expect-error
      outputNames.reduce((acc, name) => {
        return acc.merge(
          z.object({
            [name]: z.any(),
          })
        );
      }, z.object({}))
    );
  }

  async _run(args: RunStepArgs<PromptStepInput, PromptStepOutput>) {
    logger.info(`Running PromptStep: ${this.name}, with args: ${args}`);

    const completion = await this.provider.generate(this.prompt, args.inputs);

    logger.info(`PromptStep: ${this.name} generated completion: ${completion}`);

    const parsed = this.prompt.parse(completion);

    logger.info(`PromptStep: ${this.name} parsed completion: ${parsed}`);

    const output = { [this.outputNames[0]]: parsed };

    logger.info(`PromptStep: ${this.name} output: ${output}`);

    return output;
  }

  _serialize = () => {
    // todo: better serialization
    return {
      prompt: this.prompt.toJson(),
    };
  };
}
