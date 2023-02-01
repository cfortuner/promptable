import { Prompt } from "@prompts/Prompt";
import { ModelProvider } from "../model-providers/ModelProvider";
import { z } from "zod";
import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";
import { logger } from "@utils/Logger";

export interface PromptStepInput extends StepInput { }
export interface PromptStepOutput extends StepOutput { }

interface UnmappedOutput {
  promptText: string;
  completion: string;
  output: string;
}

export interface PromptStepArgs<
  T extends PromptStepInput,
  J extends PromptStepOutput
> {
  name?: string;
  prompt: Prompt;
  provider: ModelProvider;
  inputNames: (keyof T)[];
  outputMap?: Partial<{ [key in keyof UnmappedOutput]: string }>;
}

export class PromptStep<
  T extends PromptStepInput,
  J extends PromptStepOutput
> extends Step<T, J, UnmappedOutput> {
  prompt: Prompt;
  provider: ModelProvider;
  inputNames: (keyof T)[] = [];

  constructor({
    name,
    prompt,
    provider,
    inputNames,
    outputMap,
  }: PromptStepArgs<T, J>) {
    super(name || "Prompt", outputMap);
    this.prompt = prompt;
    this.provider = provider;
    this.inputNames = inputNames;
    this.outputMap = (outputMap === undefined) ?
      { output: "output", completion: "completion", promptText: "promptText" }
      : outputMap;

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

    /*
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
    */
  }

  async _run(args: RunStepArgs<PromptStepInput, PromptStepOutput>): Promise<UnmappedOutput> {
    logger.info(`Running PromptStep: ${this.name}, with args: ${args}`);

    const promptText = this.prompt.format(args.inputs);
    const completion = await this.provider.generate(promptText);

    logger.debug(
      `PromptStep: ${this.name} generated completion: ${completion}`
    );

    const parsed = this.prompt.parse(completion);

    logger.debug(`PromptStep: ${this.name} parsed completion: ${parsed}`);

    // const output = { [this.outputMap.output]: parsed, [this.outputMap.completion]: completion, [this.outputMap.promptText]: promptText };
    const unmappedOutput = { output: parsed, completion, promptText };
    logger.debug(`PromptStep: ${this.name} output: ${unmappedOutput}`);

    return unmappedOutput;
  }

  _serialize = () => {
    // todo: better serialization
    return {
      prompt: this.prompt.toJson(),
    };
  };
}
