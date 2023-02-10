export type StepInput = { [input: string]: any };
export type StepOutput = { [output: string]: any };

export abstract class Step<T extends StepInput, J extends StepOutput> {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async run(inputs: T): Promise<J> {
    const outputs: any = await this._run({ ...inputs });

    return {
      ...inputs,
      ...outputs,
    };
  }

  protected abstract _run(inputs: T): Promise<J>;
}

export class CustomStep<T extends StepInput, J extends StepOutput> extends Step<
  T,
  J
> {
  private runFn: RunFn<T, J>;

  constructor(name: string, runFn: RunFn<T, J>) {
    super(name);
    this.runFn = runFn;
  }

  protected async _run(args: T): Promise<J> {
    return await this.runFn(args);
  }
}

export interface RunFn<T extends StepInput, J extends StepOutput> {
  (args: T): Promise<J>;
}
/**
 * Creates a new custom step.
 *
 * @param name the name of the step
 * @param runFn the function that will be called when the step is run
 * @returns a new step
 */
export const step = <T extends StepInput, J extends StepOutput>(
  name: string,
  runFn: RunFn<T, J>
) => new CustomStep(name, runFn);
