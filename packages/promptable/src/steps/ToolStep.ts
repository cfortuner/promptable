import { SequentialChain } from "@chains/SequentialChain";
import { Prompt, PromptVariables } from "@prompts/Prompt";
import { Chain, OpenAI } from "dist";
import { ModelProvider } from "src/model-providers/ModelProvider";
import { z } from "zod";
import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";

interface ToolStepInput extends StepInput {}

interface ToolStepOutput extends StepOutput {}

export class ToolStep<
  T extends ToolStepInput,
  J extends ToolStepOutput
> extends Step<T, J> {
  provider: ModelProvider;
  outputName: keyof J;

  constructor(provider: ModelProvider, outputName: keyof J, name = "Prompt") {
    super(name);
    this.provider = provider;
    this.outputName = outputName;
  }

  async _run(args: RunStepArgs<T, J>) {
    // const output = { [this.outputName]: completion };
    // return output;
  }

  _serialize = (): object => {
    return {};
  };
}
