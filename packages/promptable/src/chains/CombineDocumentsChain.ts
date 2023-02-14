import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { LLMChain } from "./LLMChain";
import { trace } from "../tracing";

/**
 * A Simple chain that combines documents and then runs a prompt
 *
 */
export class CombineDocumentsChain<T extends "document"> extends LLMChain<
  T,
  any
> {
  constructor(
    public prompt: Prompt<T, any>,
    public provider: CompletionsModelProvider
  ) {
    super(prompt, provider);
  }

  protected async _run(documents: string[]);
  protected async _run(documents: Document[]);
  protected async _run(documents: string[] | Document[]) {
    // const formattedPrompt = await trace("prompt.format", (variables) =>
    //   this.prompt.format(variables)
    // )(variables);
    // const completion = await trace("provider.complete", (prompt) =>
    //   (this.provider as CompletionsModelProvider).generate(prompt)
    // )(formattedPrompt);
    // const parsed = await trace("prompt.parse", (completion) =>
    //   this.prompt.parse(completion)
    // )(completion);
    // return parsed;
    // combine in a simple way

    // TODO: ensure the documents fit within the max length of the provider
    // update provider support a way to get the configured maxTokens
    // create a helper function to quickly check if a prompt will work with provider
    // use that here to check if the documents will fit within the maxTokens

    // this.provider.config.tokens;
    splitter.splitDocuments(docs, {
      chunk: true,
    });

    // The Question to use for extraction
    const question =
      args[0] || "What is the most common mistake founders make?";

    console.log(
      chalk.blue.bold("\nRunning QA Extraction: startup-mistakes.txt")
    );
    console.log(chalk.white(`Question: ${question}`));

    // Run the Question-Answer prompt on each chunk asyncronously
    const notes = await Promise.all(
      docs.map((doc) => {
        const promptText = prompt.format({
          document: doc.content,
          question,
        });

        return openai.generate(promptText);
      })
    );
  }

  async run(variables: Record<T, string>) {
    return await trace("llmchain.run", this._run)(variables);
  }
}
