import sentencize from "@stdlib/nlp-sentencize";

import { TextSplitter, TextSplitterOptions } from "./TextSplitter";

export class SentenceTextSplitter extends TextSplitter {
  splitText(text: string, opts?: TextSplitterOptions): string[] {
    const sentences = sentencize(text).map((s) => s.trim());
    return opts?.chunk || this.chunk
      ? this.createChunks(sentences, " ")
      : sentences.filter((t) => t.length);
  }
}
