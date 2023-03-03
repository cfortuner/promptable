import { Loader } from "@loaders/Loader";
import { convert } from "html-to-text";
import { TextDocument } from "@documents/TextDocument";

export class HTMLLoader implements Loader<TextDocument> {
  async load(html: string, meta?: Record<string, any>) {
    const options = {
      wordwrap: 130,
    };

    const text = convert(html, options);

    return [new TextDocument({ text })];
  }
}
