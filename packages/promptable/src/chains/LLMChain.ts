import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import {
  GenerateCompletionOptions,
  DEFAULT_COMPLETION_OPTIONS,
} from "@providers/OpenAI";

export class LLMChain<
  T extends string = string,
  P extends Parser<any> = NoopParser
> {
  constructor(
    public prompt: Prompt<T, P>,
    public provider: CompletionsModelProvider,
    public options: GenerateCompletionOptions = DEFAULT_COMPLETION_OPTIONS
  ) {}

  protected async _run(variables: Record<T, string>) {
    const prompt = this.prompt.format(variables);
    const completion = await this.provider.generate(prompt);
    const parsed = this.prompt.parse(completion);
    return parsed;
  }

  async run(variables: Record<T, string>) {
    return await this._run(variables);
  }
}
