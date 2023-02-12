import GPT3Tokenizer from "gpt3-tokenizer";
import { Document } from "src";

export class Tokenizer {
  private tokenizer: GPT3Tokenizer;

  constructor(type: "gpt3" | "codex" = "gpt3") {
    this.tokenizer = new GPT3Tokenizer({ type: type });
  }

  encode(text: string) {
    const { bpe, text: texts } = this.tokenizer.encode(text);

    return {
      tokens: bpe,
      texts: texts,
    };
  }

  decode(tokens: number[]) {
    return this.tokenizer.decode(tokens);
  }

  truncate(text: string, maxTokens: number) {
    const { tokens } = this.encode(text);

    if (tokens.length > maxTokens) {
      return this.decode(tokens.slice(0, maxTokens));
    }

    return text;
  }

  countTokens(text: string) {
    const { tokens } = this.encode(text);
    return tokens.length;
  }

  countDocumentTokens(doc: Document) {
    return this.countTokens(doc.content);
  }
}
