import { CreateDocumentOptions, Document, Metadata } from "./Document";

export interface CreateTextDocumentOptions extends CreateDocumentOptions {
  text: string;
}

export class TextDocument extends Document {
  text: string;

  constructor(opts: CreateTextDocumentOptions) {
    super(opts);
    this.text = opts.text;
  }
}
