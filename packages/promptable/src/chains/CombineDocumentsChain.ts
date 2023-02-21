import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { MergeDocuments } from "@utils/merge-documents";
import { TextSplitter, TextSplitterOptions } from "@utils/TextSplitter";
import { Document } from "src";
import { LLMChain } from "./LLMChain";

export class CombineDocumentsChain {
  constructor(
    public splitter: TextSplitter,
    public mergeDocuments: MergeDocuments,
    public summarizer?: LLMChain<"document", any>
  ) {}

  protected async _run(
    documents: Document[],
    meta: { [key: string]: any },
    opts: TextSplitterOptions = {
      chunk: true,
    }
  ) {
    const docs = this.splitter.splitDocuments(documents, opts);

    if (!this.summarizer) {
      return this.mergeDocuments(documents, meta);
    }

    const results = await Promise.all(
      docs.map(async (doc) => {
        const summary = await this.summarizer!.run({ document: doc.content });
        return {
          content: summary,
          meta: doc.meta,
        };
      })
    );

    return this.mergeDocuments(results, meta);
  }

  async run(
    documents: Document[],
    opts: TextSplitterOptions = {
      chunk: true,
    }
  ) {
    return await this._run(documents, opts);
  }
}
