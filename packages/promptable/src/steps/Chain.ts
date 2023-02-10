import { RunFn, Step, step, StepInput, StepOutput } from "./Step";

export function chain<A extends StepInput, B extends StepInput>(
  step: Step<A, B>
): Step<A, B>;
export function chain<
  A extends StepInput,
  B extends StepInput,
  C extends StepOutput
>(step1: Step<A, B>, step2: Step<B, C>): Step<A, C>;
export function chain<
  A extends StepInput,
  B extends StepInput,
  C extends StepInput,
  D extends StepOutput
>(step1: Step<A, B>, step2: Step<B, C>, step3: Step<C, D>): Step<A, D>;
export function chain(...steps: Step<any, any>[]) {
  return step("chain", async (props) => {
    let nextProps = props;

    for (const step of steps) {
      const result = await step.run(nextProps);
      nextProps = { ...nextProps, ...result };
    }

    return nextProps;
  });
}
