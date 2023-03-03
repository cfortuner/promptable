import GPT3Tokenizer from "gpt3-tokenizer";
import { TextDocument } from "@documents/TextDocument";

export interface TextSplitterOptions {
  lengthFn?: (text: string) => number;
  chunk?: boolean;
  chunkSize?: number;
  overlap?: number;
  meta?: Record<string, any>;
}

export abstract class TextSplitter {
  chunk = false;
  chunkSize = 1000;
  overlap = 200;

  protected tokenizer = new GPT3Tokenizer({ type: "gpt3" });

  constructor(opts?: TextSplitterOptions) {
    if (typeof opts?.chunkSize !== "undefined") {
      this.chunkSize = opts.chunkSize;
    }
    if (typeof opts?.overlap !== "undefined") {
      if (opts.overlap > this.chunkSize) {
        throw Error(
          `Error: Overlap is greater than chunkSize, overlap ${opts.overlap}, chunksize: ${this.chunkSize}`
        );
      }
      this.overlap = opts.overlap;
    }

    if (typeof opts?.chunk !== "undefined") {
      this.chunk = opts.chunk;
    }

    if (typeof opts?.lengthFn !== "undefined") {
      this.lengthFn = opts.lengthFn;
    }
  }

  abstract splitText(text: string, opts?: TextSplitterOptions): string[];
  mergeText(texts: string[], separator: string = " "): string {
    return texts.map((text) => text.trim()).join(separator);
  }
  mergeDocuments(docs: TextDocument[]): string {
    const texts = docs.map((doc) => doc.text);
    return this.mergeText(texts);
  }
  splitDocuments(
    docs: TextDocument[],
    opts?: TextSplitterOptions
  ): TextDocument[] {
    const texts = docs.map((doc) => doc.text);
    const metas = docs.map((doc, i) => ({
      ...doc.metadata,
      ...opts?.meta,
      parentId: doc.id,
      part: i,
    }));
    return this.createDocuments(texts, metas, opts);
  }

  // colin: we need to make sure to keep track of the original document id
  createDocuments(
    texts: string[],
    metas: (Record<string, any> | undefined)[] = [],
    opts?: TextSplitterOptions
  ) {
    const docs = [];
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const chunks = this.splitText(text, opts);
      for (const chunk of chunks) {
        docs.push(
          new TextDocument({
            text: chunk,
            metadata: metas[i] || {},
          })
        );
      }
    }
    return docs;
  }

  protected createChunks(texts: string[], separator: string): string[] {
    // build up chunks based on chunk size
    return texts.reduce((chunks: string[], text) => {
      let chunk = "";

      // Check if the last chunk is below the chunkSize + overlap.
      const lastChunk = (chunks.length && chunks[chunks.length - 1]) || "";
      const lastChunkLength = this.lengthFn(lastChunk);
      if (lastChunkLength < this.chunkSize + this.overlap) {
        chunk = chunks.pop() || "";
      }

      chunk = chunk === "" ? text : chunk + separator + text;

      if (chunk.length) {
        chunks.push(chunk);
      }

      return chunks;
    }, []);
  }

  getLength: (text: string) => number = (text: string) => {
    return this.lengthFn(text);
  };

  private lengthFn = (text: string) => {
    const encoded: { bpe: number[]; text: string[] } =
      this.tokenizer.encode(text);

    return encoded.bpe.length;
  };
}
