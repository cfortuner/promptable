import { Prompt } from "@prompts/Prompt";
import {
  CompletionsModelProvider,
  ModelProvider,
} from "@providers/ModelProvider";
import { Step } from "./Step";

interface LLMCompletionProps {
  variables: { [key: string]: string };
}

interface LLMCompletionOutput {
  completion: string;
}

interface Opts {
  prompt: Prompt;
  provider: ModelProvider;
}

export class LLMCompletionStep extends Step<
  LLMCompletionProps,
  LLMCompletionOutput
> {
  prompt: Prompt;
  provider: CompletionsModelProvider;

  constructor(
    name: string,
    { prompt, provider }: { prompt: Prompt; provider: CompletionsModelProvider }
  ) {
    super(name);
    this.prompt = prompt;
    this.provider = provider;
  }

  protected async _run({ variables }: LLMCompletionProps) {
    const r = await this.provider.generate(this.prompt, variables);
    return { completion: r };
  }
}

/**
 * LLM Completion step generates a completion from a prompt
 *
 * @example
 * const step = LLMCompletion('my-step', prompt, provider)
 *
 * const result = await step.run({
 *  variables: {
 *    name: 'John'
 *  }
 * })
 *
 * @param props the step props
 * @param props.prompt the prompt to use
 * @param props.variables the variables to use
 * @param props.provider the model provider to use
 * @returns the step result with the completion added to the props object
 */
const completion = (
  name: string,
  // todo: maybe allow provider / prompt to be strings
  opts: { prompt: Prompt; provider: CompletionsModelProvider }
) => new LLMCompletionStep(name, opts);

const llm = { completion };
export default llm;
