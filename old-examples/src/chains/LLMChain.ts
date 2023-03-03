import {
  Prompt,
  PromptTemplate,
  PromptVariables,
} from "@promptable/promptable";
import { CompletionsModelProvider } from "@promptable/promptable";
import { GenerateCompletionOptions } from "@promptable/promptable";

export class LLMChain<T extends string, V extends PromptVariables<T>> {
  constructor(
    public prompt: PromptTemplate<T, V>,
    public provider: CompletionsModelProvider,
    public options?: GenerateCompletionOptions
  ) {}

  protected async _run(variables: V) {
    const prompt = this.prompt.build(variables);

    const completion = await this.provider.generate({
      text: prompt.text,
    });

    return completion.text;
  }

  async run(variables: V) {
    return await this._run(variables);
  }
}
