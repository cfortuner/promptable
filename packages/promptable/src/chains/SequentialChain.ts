import { RunStepArgs, StepInput, StepOutput } from "src/steps/Step";
import { Chain } from "./Chain";

export class SequentialChain extends Chain {
  async _run(args: RunStepArgs<StepInput, StepOutput>) {
    console.log("CHAIN INPUTS", args.inputs);

    let nextInputs = { ...args.inputs };

    for (const step of args.steps) {
      const outputs = await step.run({
        steps: args.steps,
        inputs: nextInputs,
      });

      nextInputs = { ...outputs };
    }
  }
}
