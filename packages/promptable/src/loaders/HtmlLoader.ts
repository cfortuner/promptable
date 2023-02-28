import { Loader } from "@loaders/index";
import { convert } from "html-to-text";

// There is also an alias to `convert` called `htmlToText`.

export class HTMLLoader implements Loader {
  async load(html: string, meta?: Record<string, any>) {
    const options = {
      wordwrap: 130,
    };

    const text = convert(html, options);

    return [
      {
        data: text,
        meta,
      },
    ];
  }
}
