import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { trace } from "../tracing";
import { Memory } from "../memories";

// TODO: type safety so MemoryLLMChain requires "memory" in the variables
// TODO: make this inherit from LLMChain since the only thing that's different is the run method

export class MemoryLLMChain<T extends string = string, P extends Parser<any> = NoopParser> {
    constructor(public prompt: Prompt<T, P>, public provider: CompletionsModelProvider, public memory: Memory) { }

    private async _run(variables: Record<T, string>) {
        const formattedPrompt = await trace("prompt.format", (variables) => this.prompt.format(variables))(variables);
        const completion = await trace("provider.complete",
            (prompt) => (this.provider as CompletionsModelProvider).generate(prompt))(formattedPrompt);
        const parsed = await trace("prompt.parse", (completion) => this.prompt.parse(completion))(completion);
        return parsed;
    }

    async run(variables: Omit<Record<T, string>, "memory">) {
        const vars = { ...variables, memory: this.memory.get() };
        return trace("llmchain.run", (variables) => this._run(variables))(vars);
    }
}