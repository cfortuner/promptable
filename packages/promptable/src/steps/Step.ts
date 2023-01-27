import z from "zod";

export type StepInput = { [input: string]: any };

export type StepOutput = StepInput & { [output: string]: any };

export type StepCall<T extends StepInput, J extends StepOutput> = Omit<
  RunStepArgs<T, J>,
  "steps"
> & {
  outputs: J;
};

export abstract class Step<T extends StepInput, J extends StepOutput> {
  name: string;

  private inputsSchema?: z.Schema;
  private outputsSchema?: z.Schema;

  // todo: This should be put into it's own class
  // responsible for logging calls
  // Might also want to store different execution ids
  // within a chain?
  calls: Partial<StepCall<any, any>>[] = [];

  constructor(name: string) {
    this.name = name;
  }

  inputs(schema: z.Schema<T>) {
    this.inputsSchema = schema;
    return this;
  }

  outputs(schema: z.Schema<J>) {
    this.outputsSchema = schema;
    return this;
  }

  async run(args: UnknownRunStepArgs) {
    this.recordCall({
      inputs: args.inputs,
    });

    // validate inputs
    const inputs = this.preprocess(args.inputs);

    const outputs: any = await this._run({
      ...args,
      inputs,
    });

    // update the call with the outputs
    this.recordCall(
      {
        outputs,
      },
      true
    );

    // validate outputs and build outputs
    return this.postprocess(inputs, outputs);
  }

  /**
   * Record the calls to this step.
   *
   * @param args
   * @param updatePrev
   */
  protected recordCall(args: Partial<StepCall<any, any>>, updatePrev = false) {
    if (updatePrev) {
      if (!this.calls.length) {
        throw Error("Cannot update last call, calls length is 0");
      }

      const prev = this.calls[this.calls.length - 1];

      this.calls[this.calls.length - 1] = {
        ...prev,
        ...args,
      };
    } else {
      this.calls.push({
        ...args,
      });
    }
  }

  protected preprocess(inputs: any) {
    if (!this.validateInputs(inputs)) {
      throw Error(
        `Invalid inputs ${JSON.stringify(inputs)} at step ${this.name}`
      );
    }

    return inputs;
  }

  protected postprocess(inputs: T, outputs: any) {
    if (!this.validateOutputs(outputs)) {
      throw Error(
        `Invalid outputs ${JSON.stringify(outputs)} at step ${this.name}`
      );
    }

    return {
      ...inputs,
      ...outputs,
    };
  }

  protected abstract _run(args: RunStepArgs<T, J>): any;

  serialize() {
    if (!this.calls) {
      return {};
    }

    const call = this.calls[this.calls.length - 1];

    return {
      call,
      ...this._serialize(),
    };
  }
  abstract _serialize(): object;

  private validateInputs(inputs?: any): inputs is T {
    return this.inputsSchema?.parse(inputs);
  }
  private validateOutputs(outputs?: any): outputs is J {
    return this.outputsSchema?.parse(outputs);
  }
}

export type UnknownRunStepArgs = {
  steps: Step<any, any>[];
  inputs: any;
};

export type RunStepArgs<T extends StepInput, J extends StepOutput> = {
  steps: Step<T, J>[];
  inputs: T;
};
