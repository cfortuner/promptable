import { Loader } from "@loaders/index";
import { convert } from "html-to-text";
import { TextDocument } from "src/documents/Document";

export class HTMLLoader implements Loader {
  async load(html: string, meta?: Record<string, any>) {
    const options = {
      wordwrap: 130,
    };

    const text = convert(html, options);

    return [new TextDocument(text)];
  }
}
