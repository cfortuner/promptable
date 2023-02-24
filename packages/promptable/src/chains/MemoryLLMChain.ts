import { Prompt, PromptTemplate, PromptVariables } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { Memory } from "src/memories/index";
import { LLMChain } from "@chains/LLMChain";

export class MemoryLLMChain<
  V extends { memory: string; userInput: string }
> extends LLMChain<string, V> {
  constructor(
    public template: PromptTemplate<string, V>,
    public provider: CompletionsModelProvider,
    public memory: Memory
  ) {
    super(template, provider);
  }

  async run(v: Omit<V, "memory">) {
    const vars = {
      userInput: v.userInput,
      memory: this.memory.get(),
    } as V;

    return await this._run(vars);
  }
}
