import {
  RunStepArgs,
  Step,
  StepCall,
  StepInput,
  StepOutput,
} from "../steps/Step";

export abstract class Chain extends Step<any, any> {
  constructor(name: string) {
    super(name);
  }

  protected preprocess(inputs: any) {
    return inputs;
  }

  protected postprocess(outputs: any) {
    return outputs;
  }
}
