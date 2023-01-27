import { injectVariables } from "./utils";

export class Prompt {
  private readonly _text: string;
  private readonly _variables: { [name: string]: string };
  private readonly _outputName: string;

  constructor(
    text: string,
    variables: { [name: string]: string },
    outputName: string
  ) {
    this._text = text || "";
    this._variables = variables || {};
    this._outputName = outputName || "output";
  }

  format() {
    return injectVariables(this._text, this._variables);
  }
}