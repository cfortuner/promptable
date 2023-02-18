import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";

export class LLMChain<
  T extends string = string,
  P extends Parser<any> = NoopParser
> {
  constructor(
    public prompt: Prompt<T, P>,
    public provider: CompletionsModelProvider
  ) {}

  protected async _run(variables: Record<T, string>) {
    const completion = await this.provider.generate({
      prompt: this.prompt,
      variables,
    });

    const parsed = this.prompt.parse(completion);
    return parsed;
  }

  async run(variables: Record<T, string>) {
    return this._run(variables);
  }
}
