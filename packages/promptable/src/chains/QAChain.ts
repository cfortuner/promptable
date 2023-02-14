import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { Embeddings, LLMChain } from "dist";
import { Document } from "src";
import { trace } from "../tracing";
import { Chain } from "./Chain";

export class QAChain<
  T extends string = string,
  P extends string = string
> extends Chain {
  constructor(
    public docs: Document[],
    public instruction: LLMChain<"document", any>
  ) {
    super();
  }

  protected async _run(question: string) {
    const notes = await Promise.all(
      this.docs.map((doc) => {
        this.instruction.run({
          document: doc.content,
        });
        const promptText = prompt.format({
          document: doc.content,
          question,
        });

        return openai.generate(promptText);
      })
    );

    console.log(
      chalk.greenBright(
        `Notes: ${JSON.stringify(
          {
            question,
            notes,
          },
          null,
          4
        )}`
      )
    );
  }

  async run(question: string) {
    return await trace("qachain.run", this._run)(question);
  }
}

// Load the file
const filepath = "./data/startup-mistakes.txt";
const loader = new FileLoader(filepath);
const splitter = new CharacterTextSplitter("\n");

// load and split the documents
let docs = await loader.load();
docs = splitter.splitDocuments(docs, {
  chunk: true,
});
