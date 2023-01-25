import GPT3Tokenizer from "gpt3-tokenizer";

export interface TextSplitterOptions {}

/**
 * Interface for splitting text by tokens.
 */
export abstract class TextSplitter {
  chunkSize = 4000;

  countTokens: (text: string) => number;

  constructor(chunkSize: number, countTokens: (text: string) => number) {
    this.chunkSize = chunkSize;
    this.countTokens = countTokens;
  }

  abstract splitText(text: string): string[];
}

export class OpenAITextSplitter extends TextSplitter {
  private tokenizer: GPT3Tokenizer;

  constructor(chunkSize: number, countTokens: (text: string) => number) {
    super(chunkSize, countTokens);
    this.tokenizer = new GPT3Tokenizer({ type: "gpt3" });
  }

  /**
   * Split text by max tokens.
   *
   * @param text string
   * @param maxTokens number
   * @returns
   */
  splitText = (text: string): string[] => {
    const encoded: { bpe: number[]; text: string[] } =
      this.tokenizer.encode(text);

    const res: string[] = [];
    for (let i = 0; i < encoded.text.length; i += this.chunkSize) {
      res.push(encoded.text.slice(i, i + this.chunkSize).join(""));
    }

    return res;
  };
}
