import { TextSplitter, TextSplitterOptions } from "./TextSplitter";

export class CharacterTextSplitter extends TextSplitter {
  character: string;

  constructor(character: string = "\n\n", opts?: TextSplitterOptions) {
    super(opts);
    this.character = character;
  }

  splitText = (text: string, opts?: TextSplitterOptions): string[] => {
    const texts = text.split(this.character).map((t) => t.trim());
    return opts?.chunk || this.chunk
      ? this.createChunks(texts, this.character)
      : texts.filter((t) => t.length);
  };
}
