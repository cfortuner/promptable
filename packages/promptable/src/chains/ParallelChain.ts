import { RunStepArgs, StepInput, StepOutput } from "src/steps/Step";
import { Chain } from "./Chain";

/**
 * Runs steps in parallel.
 *
 * Outputs a array of outputs.
 */
export class ParallelChain extends Chain {
  async _run(args: RunStepArgs<any, any>) {
    const results = await Promise.all(
      args.steps.map((step) => {
        const nextInputs = { ...args.inputs };

        return step.run({
          steps: args.steps,
          //TODO: Do i need to deepcopy this?
          inputs: nextInputs,
        });
      })
    );

    const outputs = results.map((results) => {
      const nextInputs = { ...args.inputs };
      return {
        ...nextInputs,
        ...results,
      };
    });

    // the final output
    return outputs;
  }
}
