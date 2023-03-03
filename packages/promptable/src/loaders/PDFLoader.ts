import fs from "fs";
import pdf from "pdf-parse";
import { TextDocument } from "src/documents/Document.js";
import { Loader } from ".";

export class PDFLoader implements Loader {
  public async load(filepath: string) {
    const buffer = await fs.promises.readFile(filepath);
    const parsed = await pdf(buffer);
    return [new TextDocument(parsed.text, { source: filepath })];
  }
}
