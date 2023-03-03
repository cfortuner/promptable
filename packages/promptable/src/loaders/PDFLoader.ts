import fs from "fs";
import pdf from "pdf-parse";
import { TextDocument } from "@documents/TextDocument";
import { Loader } from "@loaders/Loader";

export class PDFLoader implements Loader<TextDocument> {
  public async load(filepath: string) {
    const buffer = await fs.promises.readFile(filepath);
    const parsed = await pdf(buffer);

    return [
      new TextDocument({
        text: parsed.text,
        metadata: { source: filepath },
      }),
    ];
  }
}
