import { RunStepArgs, StepInput, StepOutput } from "src/steps/Step";
import { Chain } from "./Chain";

export class SequentialChain extends Chain {
  async _run(args: RunStepArgs<StepInput, StepOutput>) {
    for (const step of args.steps) {
      await step.run({
        steps: args.steps,
        inputs: { ...args.inputs },
        outputs: { ...args.outputs },
      });
    }
  }
}
