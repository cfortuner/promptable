import { logger } from "../Logger";
import GPT3Tokenizer from "gpt3-tokenizer";


export interface TextSplitterOptions {
  lengthFn?: (text: string) => number;
  chunkSize?: number;
  overlap?: number;
}

export abstract class TextSplitter {
  chunkSize = 4000;
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

    if (typeof opts?.lengthFn !== "undefined") {
      this.lengthFn = opts.lengthFn;
    }
  }

  abstract splitText(text: string): string[];

  protected createChunks(texts: string[], separator: string): string[] {
    logger.debug(
      `Creating chunks with texts: ${texts} and separator: ${separator}`
    );
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

      chunks.push(chunk);
      // console.log(chunks, chunk, lastChunk, lastChunkLength);

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

  public serialize() {
    return {
      chunkSize: this.chunkSize,
      overlap: this.overlap,
    };
  }
}

export class CharacterTextSplitter extends TextSplitter {
  character: string;

  constructor(character: string = "\n\n", opts?: TextSplitterOptions) {
    super(opts);
    this.character = character;
  }

  splitText = (text: string): string[] => {
    logger.debug(`Splitting text by character: ${this.character}`);
    const texts = text.split(this.character);

    return this.createChunks(texts, this.character);
  };
}
