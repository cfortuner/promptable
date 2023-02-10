import { RunFn, Step, step, StepInput, StepOutput } from "./Step";

export class ChainStep<
  Props extends StepInput,
  Outputs extends StepOutput
> extends Step<Props, Outputs> {
  id: string;
  steps: Step<any, any>[] = [];

  constructor(name: string) {
    super(name);
    this.id = "";
  }

  protected async _run(props: Props): Promise<Outputs> {
    let inputs = { ...props };
    let outputs = {} as Outputs;

    for (const step of this.steps) {
      const result = await step.run(props);
      outputs = { ...result };
      inputs = { ...result };
    }

    return outputs;
  }

  sequence<A extends StepInput, B extends StepOutput>(
    step: Step<A, B>
  ): ChainStep<A, B>;
  sequence<A extends StepInput, B extends StepInput, C extends StepOutput>(
    step1: Step<A, B>,
    step2: Step<B, C>
  ): ChainStep<A, C>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepOutput
  >(step1: Step<A, B>, step2: Step<B, C>, step3: Step<C, D>): ChainStep<A, D>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepInput,
    E extends StepOutput
  >(
    step1: Step<A, B>,
    step2: Step<B, C>,
    step3: Step<C, D>,
    step4: Step<D, E>
  ): ChainStep<A, E>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepInput,
    E extends StepInput,
    F extends StepOutput
  >(
    step1: Step<A, B>,
    step2: Step<B, C>,
    step3: Step<C, D>,
    step4: Step<D, E>,
    step5: Step<E, F>
  ): ChainStep<A, F>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepInput,
    E extends StepInput,
    F extends StepInput,
    G extends StepOutput
  >(
    step1: Step<A, B>,
    step2: Step<B, C>,
    step3: Step<C, D>,
    step4: Step<D, E>,
    step5: Step<E, F>,
    step6: Step<F, G>
  ): ChainStep<A, G>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepInput,
    E extends StepInput,
    F extends StepInput,
    G extends StepInput,
    H extends StepOutput
  >(
    step1: Step<A, B>,
    step2: Step<B, C>,
    step3: Step<C, D>,
    step4: Step<D, E>,
    step5: Step<E, F>,
    step6: Step<F, G>,
    step7: Step<G, H>
  ): ChainStep<A, H>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepInput,
    E extends StepInput,
    F extends StepInput,
    G extends StepInput,
    H extends StepInput,
    I extends StepOutput
  >(
    step1: Step<A, B>,
    step2: Step<B, C>,
    step3: Step<C, D>,
    step4: Step<D, E>,
    step5: Step<E, F>,
    step6: Step<F, G>,
    step7: Step<G, H>,
    step8: Step<H, I>
  ): ChainStep<A, I>;
  sequence<
    A extends StepInput,
    B extends StepInput,
    C extends StepInput,
    D extends StepInput,
    E extends StepInput,
    F extends StepInput,
    G extends StepInput,
    H extends StepInput,
    I extends StepInput,
    J extends StepOutput
  >(
    step1: Step<A, B>,
    step2: Step<B, C>,
    step3: Step<C, D>,
    step4: Step<D, E>,
    step5: Step<E, F>,
    step6: Step<F, G>,
    step7: Step<G, H>,
    step8: Step<H, I>,
    step9: Step<I, J>
  ): ChainStep<A, J>;
  sequence(...steps: Step<any, any>[]): ChainStep<any, any> {
    this.steps.push(...steps);
    return this;
  }
}

/**
 * Creates a new chain.
 *
 * Chains are a way to compose steps together. They are useful for creating
 * complex workflows that can be reused across different prompts.
 */
export const chain = (name: string) => new ChainStep(name);
