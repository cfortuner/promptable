import {
  RunStepArgs,
  Step,
  StepCall,
  StepInput,
  StepOutput,
} from "../steps/Step";

export abstract class Chain extends Step<any, any> {
  steps: Step<any, any>[] = [];

  constructor(name: string) {
    super(name);
  }

  async run(args: RunStepArgs<StepInput, StepOutput>) {
    this.steps = args.steps;

    return super.run(args);
  }

  protected preprocess(inputs: any) {
    return inputs;
  }

  protected postprocess(outputs: any) {
    return outputs;
  }

  _serialize(): object {
    // todo: improve chain serialization
    return this.steps.reduce(
      (acc: any, step) => {
        acc.steps.push(step.serialize());

        return acc;
      },
      {
        name: this.name,
        steps: [],
      }
    );
  }
}
