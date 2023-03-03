import { TextSplitter } from "./TextSplitter";
import { TextSplitterOptions } from "./TextSplitter";

export class TokenSplitter extends TextSplitter {
  chunk = true;

  splitText(text: string, opts?: Omit<TextSplitterOptions, "chunk">): string[] {
    const chunkSize = opts?.chunkSize || this.chunkSize;
    const overlap = opts?.overlap || this.overlap;

    const chunks = [];

    // Encode the text using the tokenizer
    const encoded: { bpe: number[]; text: string[] } =
      this.tokenizer.encode(text);

    // Get the length of the input
    const encodedLength = encoded.bpe.length;

    // Set the starting index and current index for the loop
    let startIndex = 0;
    let currentIndex = Math.min(startIndex + chunkSize, encodedLength);

    // Get the encodedChunk by slicing the encoded tokens from startIndex to currentIndex
    let encodedChunk = encoded.bpe.slice(startIndex, currentIndex);

    // While the startIndex is less than the length of the encoded tokens
    while (startIndex < encodedLength) {
      // Decode the encodedChunk and append it to the chunks array
      const chunk = this.tokenizer.decode(encodedChunk);

      // Push the chunk to the chunks array
      chunks.push(chunk);

      // Increment the startIndex by chunkSize - overlap
      startIndex += chunkSize - overlap;

      // Update the currentIndex by taking the minimum of startIndex + chunkSize and length of the encoded tokens
      currentIndex = Math.min(startIndex + chunkSize, encodedLength);

      // Get the encodedChunk by slicing the encoded tokens from startIndex to currentIndex
      encodedChunk = encoded.bpe.slice(startIndex, currentIndex);
    }

    // Return the chunks
    return chunks.map((chunk) => chunk.trim());
  }
}
