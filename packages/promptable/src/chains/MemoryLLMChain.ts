import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt, PromptVariables } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { Memory } from "src/memories/index";
import { LLMChain } from "@chains/LLMChain";

export class MemoryLLMChain<
  T extends "memory" | "userInput",
  P extends Parser<any> = NoopParser
> extends LLMChain<T, P> {
  constructor(
    public prompt: Prompt<T>,
    public parser: P,
    public provider: CompletionsModelProvider,
    public memory: Memory
  ) {
    super(prompt, parser, provider);
    this.prompt = prompt;
  }

  protected async _run(variables: PromptVariables<T>) {
    const formattedPrompt = this.prompt.format(variables);
    const completion = await this.provider.generate(formattedPrompt);
    const parsed = this.parser.parse(completion.text);
    return parsed;
  }

  async run(variables: Omit<PromptVariables<T>, "memory">) {
    const vars = {
      ...variables,
      memory: this.memory.get(),
    } as PromptVariables<T>;

    return await this._run(vars);
  }
}
