import GPT3Tokenizer from "gpt3-tokenizer";
import { describe, beforeEach, expect, it } from "@jest/globals";
import { CharacterTextSplitter } from "./index";

describe("CharacterTextSplitter", () => {
  let splitter: CharacterTextSplitter;

  beforeEach(() => {});

  it("should return an array of chunks of text", () => {
    const text = "This is a test text to be split.\n\nHi.";

    const encoded = new GPT3Tokenizer({ type: "gpt3" });

    splitter = new CharacterTextSplitter("\n\n", {
      chunkSize: encoded.bpe.length / 2,
      overlap: 0,
    });

    const chunks = splitter.splitText(text);

    expect(chunks).toBeInstanceOf(Array);
    expect(chunks.length).toBeGreaterThan(1);
  });
});
