import { Converter } from "showdown";
import { TextDocument } from "@documents/TextDocument";
import { Loader } from "@loaders/Loader";

export class MarkdownLoader implements Loader<TextDocument> {
  /**
   *
   * The MarkdownLoader loads a Markdown string and converts it to HTML using the showdown library,
   * then strips out the HTML tags using a regular expression.
   * The resulting plain text is then used to create a new TextDocument object.
   *
   * @param markdown
   * @param meta
   * @returns a TextDocument object
   */
  async load(markdown: string, meta?: Record<string, any>) {
    const converter = new Converter();
    const html = converter.makeHtml(markdown);
    const text = html.replace(/(<([^>]+)>)/gi, "");
    return [new TextDocument({ text, metadata: meta })];
  }
}
