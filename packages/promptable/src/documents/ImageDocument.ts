import { Document, Metadata, CreateDocumentOptions } from "./Document";

interface CreateImageDocumentOptions extends CreateDocumentOptions {
  image: Uint8Array;
}

export class ImageDocument extends Document {
  image: Uint8Array; // blob

  constructor(opts: CreateImageDocumentOptions) {
    super(opts);
    this.image = opts.image;
  }
}
