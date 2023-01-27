import { Step, StepInput, StepOutput, RunStepArgs } from "./Step";

interface ToolStepInput extends StepInput {}

interface ToolStepOutput extends StepOutput {}

export abstract class ToolStep<
  T extends ToolStepInput,
  J extends ToolStepOutput
> extends Step<T, J> {
  constructor(name: string, ...args: any[]) {
    super(name);
  }

  abstract _run(args: RunStepArgs<T, J>): Promise<any>;

  abstract _serialize(): object;
}
