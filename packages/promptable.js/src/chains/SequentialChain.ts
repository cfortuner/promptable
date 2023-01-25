import { RunStepArgs, StepInput, StepOutput } from "src/steps/Step";
import { any } from "zod";
import { Chain } from "./Chain";

export class SequentialChain extends Chain {
  async _run(args: RunStepArgs<StepInput, StepOutput>) {
    // the initial props
    this.props = args;

    for (const step of this.substeps) {
      await step.run({
        steps: this.substeps,
        inputs: this.props.inputs || {},
        outputs: this.props.outputs || {},
      });
    }
  }
}
