import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt, PromptVariables } from "@prompts/Prompt";
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
    public prompt: Prompt<T>,
    public parser: P,
    public provider: CompletionsModelProvider,
    public options: GenerateCompletionOptions = DEFAULT_COMPLETION_OPTIONS
  ) {}

  protected async _run(variables: PromptVariables<T>) {
    const prompt = this.prompt.format(variables);

    const completion = await this.provider.generate({
      text: prompt.text,
    });

    const parsed = this.parser.parse(completion.text);
    return parsed;
  }

  async run(variables: PromptVariables<T>) {
    return await this._run(variables);
  }
}
