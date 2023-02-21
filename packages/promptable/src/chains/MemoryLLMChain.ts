import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { Memory } from "src/memories/index";
import { LLMChain } from "@chains/LLMChain";

// TODO: Trace currently requires an anonymous function to be passed in
// to the trace function. There is some issue with the binding of this

export class MemoryLLMChain<
  T extends "memory" | "userInput",
  P extends Parser<any> = NoopParser
> extends LLMChain<T, P> {
  constructor(
    public prompt: Prompt<T, P>,
    public provider: CompletionsModelProvider,
    public memory: Memory
  ) {
    super(prompt, provider);
    this.prompt = prompt;
  }

  protected async _run(variables: Record<T, string>) {
    const formattedPrompt = this.prompt.format(variables);
    const completion = await this.provider.generate(formattedPrompt);
    const parsed = this.prompt.parse(completion);
    return parsed;
  }

  async run(variables: Omit<Record<T, string>, "memory">) {
    const vars = { ...variables, memory: this.memory.get() } as Record<
      T,
      string
    >;

    return await this._run(vars);
  }
}
