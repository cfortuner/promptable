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

  toJSON() {
    return {
      id: this.id,
      metadata: this.metadata,
      image: this.image,
    };
  }

  static fromJSON(json: any) {
    return new ImageDocument(json);
  }
}
