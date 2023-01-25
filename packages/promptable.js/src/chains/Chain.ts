import { Step, StepInput, StepOutput } from "../steps/Step";

export abstract class Chain extends Step<any, any> {
  substeps: Step<StepInput, StepOutput>[] = [];

  constructor(name: string, substeps?: Step<StepInput, StepOutput>[]) {
    super(name);
    this.substeps = substeps || [];
  }

  step(step: Step<StepInput, StepOutput>) {
    this.substeps.push(step);
  }
}
