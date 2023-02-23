import { Prompt, PromptVariables } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import {
  GenerateCompletionOptions,
  DEFAULT_COMPLETION_OPTIONS,
} from "@providers/OpenAI";

export class LLMChain<T extends string, V extends PromptVariables<T>> {
  constructor(
    public prompt: Prompt<T, V>,
    public provider: CompletionsModelProvider,
    public options: GenerateCompletionOptions = DEFAULT_COMPLETION_OPTIONS
  ) {}

  protected async _run(variables: V) {
    const prompt = this.prompt.format(variables);

    const completion = await this.provider.generate({
      text: prompt.text,
    });

    return completion.text;
  }

  async run(variables: V) {
    return await this._run(variables);
  }
}
