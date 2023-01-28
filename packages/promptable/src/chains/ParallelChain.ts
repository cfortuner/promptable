import { logger } from "@utils/Logger";
import { RunStepArgs, StepInput, StepOutput } from "src/steps/Step";
import { Chain } from "./Chain";

interface ParallelStepInput extends StepInput {
  parallelInputs: any[];
}
export interface ParallelRunStepArgs<
  T extends ParallelStepInput,
  J extends StepOutput
> extends RunStepArgs<T, J> {}

/**
 * Runs steps in parallel.
 *
 * Outputs a array of outputs.
 */
export class ParallelChain<
  T extends ParallelStepInput,
  J extends StepOutput
> extends Chain<T, J> {
  constructor(name: string) {
    super(name);
  }

  async _run(args: ParallelRunStepArgs<T, J>) {
    const { parallelInputs } = args.inputs;

    logger.info(
      `ParallelChain: ${this.name} running steps: ${args.steps.map(
        (s) => s.name
      )}, inputs: ${JSON.stringify(parallelInputs)}`
    );

    const results = await Promise.all(
      args.steps.map((step, i) => {
        const nextInputs: any = parallelInputs[i];

        return step.run({
          steps: args.steps,

          //TODO: Do i need to deepcopy this?
          inputs: nextInputs,
        });
      })
    );

    const outputs = results.map((results, i) => {
      const nextInputs: any = parallelInputs[i];
      return {
        ...nextInputs,
        ...results,
      };
    });

    logger.info(
      `ParallelChain: ${this.name} running steps: ${args.steps.map(
        (s) => s.name
      )}, outputs: ${JSON.stringify(outputs)}`
    );

    // the final output
    return outputs;
  }
}
