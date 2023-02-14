import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { LLMChain } from "./LLMChain";
import { Document } from "src";
import { trace } from "../tracing";
import { Chain } from "./Chain";
import { CombineDocumentsChain } from "./CombineDocumentsChain";
import { extractText, QA } from "@prompts/prompts";

export class QAChain<T extends "documents" | "question"> extends LLMChain {
  combineDocumentsChain: CombineDocumentsChain<T>;

  constructor(
    public docs: Document[],
    public provider: CompletionsModelProvider,
    prompt?: Prompt<T, any>,
    combineDocumentsChain?: CombineDocumentsChain<T, any>
  ) {
    super(QA(), provider);
    this.prompt = prompt || super.prompt;
    this.combineDocumentsChain =
      combineDocumentsChain ||
      new CombineDocumentsChain(extractText(), provider);
  }

  protected async _run(documents: string[], question: string);
  protected async _run(documents: Document[], question: string);
  protected async _run(documents: string[] | Document[], question: string) {
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
