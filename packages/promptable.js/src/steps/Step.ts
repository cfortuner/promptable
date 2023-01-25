import z from "zod";

export type StepInput = { [input: string]: any };

export type StepOutput = { [output: string]: any };

export abstract class Step<T extends StepInput, J extends StepOutput> {
  name: string;

  private inputsSchema?: z.Schema;
  private outputsSchema?: z.Schema;

  private _props: Partial<RunStepArgs<T, J>> = {};

  calls: RunStepArgs<T, J>[] = [];

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

  getProps() {
    return {
      steps: this._props.steps || [this],
      inputs: (this._props.inputs || {}) as T,
      outputs: (this._props.outputs || {}) as J,
    };
  }

  async run(args: RunStepArgs<T, J>) {
    this._props = { ...args };

    this.calls.push(args);

    this.preprocess();

    const outputs = await this._run(this.getProps());

    this._props = {
      ...this._props,
      outputs,
    };

    // update the call with the outputs
    this.calls[this.calls.length - 1].outputs = outputs;

    this.postprocess();

    return outputs;
  }

  protected preprocess() {
    const props = this.getProps();
    // Validate input
    this.validateInputs(props.inputs);
  }
  protected postprocess() {
    const props = this.getProps();
    // Validate output
    this.validateOutputs(props.outputs);
  }

  protected abstract _run(args: RunStepArgs<T, J>): Promise<J> | J;

  private validateInputs(inputs?: T) {
    this.inputsSchema?.parse(inputs);
  }
  private validateOutputs(outputs?: J) {
    this.outputsSchema?.parse(outputs);
  }
}

export type RunStepArgs<T extends StepInput, J extends StepOutput> = {
  steps: Step<T, J>[];
  inputs: T;
  outputs: J;
};
