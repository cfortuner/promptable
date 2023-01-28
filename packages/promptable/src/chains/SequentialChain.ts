import { logger } from "@utils/Logger";
import { RunStepArgs, StepInput, StepOutput } from "src/steps/Step";
import { Chain } from "./Chain";

export class SequentialChain<
  T extends StepInput,
  J extends StepOutput
> extends Chain<T, J> {
  async _run(args: RunStepArgs<any, any>) {
    let nextInputs = { ...args.inputs };

    logger.info(
      `SequentialChain ${this.name} running steps: ${args.steps.map(
        (s) => s.name
      )}, inputs: ${JSON.stringify(nextInputs)}`
    );

    for (const step of args.steps) {
      const outputs = await step.run({
        steps: args.steps,
        inputs: nextInputs,
      });

      nextInputs = {
        ...nextInputs,
        ...outputs,
      };
    }

    logger.info(
      `SequentialChain ${this.name} outputs: ${JSON.stringify(nextInputs)}`
    );

    // the final output
    return nextInputs;
  }
}
