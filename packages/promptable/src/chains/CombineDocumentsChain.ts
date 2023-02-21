import { NoopParser, Parser } from "@prompts/Parser";
import { Prompt } from "@prompts/Prompt";
import { CompletionsModelProvider } from "@providers/ModelProvider";
import { MergeDocuments } from "@utils/merge-documents";
import { TextSplitter, TextSplitterOptions } from "@utils/TextSplitter";
import { Document } from "src";
import { LLMChain } from "./LLMChain";

/**
 * A chain which combines documents into a single document.
 *
 * You can configure the chain to split documents into chunks and optionally, summarize each chunk.
 *
 * @example
 * ```typescript
 * const summarizeChain = new LLMChain(prompts.summarize(), openai, {
 *    model: "text-davinci-003",
 *    max_tokens: 500,
 * });
 *
 * const combineDocumentsChain = new CombineDocumentsChain(
 *    new SentenceTextSplitter(),
 *    utils.mergeDocumentsWithSeparator("\n\n"),
 *    summarizeChain
 * );
 * ```
 */
export class CombineDocumentsChain {
  /**
   *
   * @param splitter a TextSplitter to split documents into chunks
   * @param mergeDocuments  A function to merge documents
   * @param summarizer (optional) a summarizer LLMChain to summarize each chun
   */
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

  /**
   * Run the CombineDocumentsChain to call the chain with documents and TextSplitterOptions
   *
   * @param documents
   * @param opts
   * @returns
   */
  async run(
    documents: Document[],
    opts: TextSplitterOptions = {
      chunk: true,
    }
  ) {
    return await this._run(documents, opts);
  }
}
