import { SequentialChain } from "@chains/SequentialChain";
import { Prompt, PromptVariables } from "@prompts/Prompt";
import { Chain, OpenAI } from "dist";
import { ModelProvider } from "src/model-providers/ModelProvider";
import { z } from "zod";
import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";

interface PromptStepInput extends StepInput {
  text: string;
  variables?: PromptVariables;
}

interface PromptStepOutput extends StepOutput {}

export class PromptStep<
  T extends PromptStepInput,
  J extends PromptStepOutput
> extends Step<T, J> {
  provider: ModelProvider;
  outputName: keyof J;

  constructor(provider: ModelProvider, outputName: keyof J, name = "Prompt") {
    super(name);
    this.provider = provider;
    this.outputName = outputName;
  }

  async _run(args: RunStepArgs<T, J>) {
    // TODO: just build a prompt with a function instead?
    // maybe pass in prompts?
    const prompt = new Prompt(args.inputs.text, args.inputs.variables || {});

    const completion = await this.provider.generate(prompt);

    // todo: add support for parsers incase its a structured response

    const output = { [this.outputName]: completion };

    // TODO: How do i remove this cast? this is probably not a good idea
    return output as J;
  }
}
