import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { trace } from "../tracing";

export class LLMChain<T extends string = string, P extends Parser<any> = NoopParser> {
    constructor(public prompt: Prompt<T, P>, public provider: CompletionsModelProvider) { }

    private async _run(variables: Record<T, string>) {
        // TODO: fix trace so that the anonymous function isn't needed
        const formattedPrompt = await trace("prompt.format", (variables) => this.prompt.format(variables))(variables);
        const completion = await trace("provider.complete",
            (prompt) => (this.provider as CompletionsModelProvider).generate(prompt))(formattedPrompt);
        const parsed = await trace("prompt.parse", (completion) => this.prompt.parse(completion))(completion);
        return parsed;
    }

    async run(variables: Record<T, string>) {
        return trace("llmchain.run", (variables) => this._run(variables))(variables);
    }
}