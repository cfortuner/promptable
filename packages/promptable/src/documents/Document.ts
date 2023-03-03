import { v4 as uuid } from "uuid";

export interface Metadata {
  [key: string]: any;
}

export class Document {
  metadata: Metadata = {};

  constructor(metadata?: Metadata) {
    if (metadata) {
      this.metadata = metadata;
    }
  }
}

export class TextDocument extends Document {
  text: string;
  embedding?: number[];

  constructor(text: string, metadata?: Metadata) {
    super(metadata);
    this.text = text;
  }
}

export class ImageDocument extends Document {
  image: Uint8Array; // blob
  embedding?: number[];

  constructor(image: Uint8Array, metadata?: Metadata) {
    super(metadata);
    this.image = image;
  }
}

export class AudioDocument extends Document {
  audio: Uint8Array; // blob
  embedding?: number[];

  constructor(audio: Uint8Array, metadata?: Metadata) {
    super(metadata);
    this.audio = audio;
  }
}

// example of a multi-modal document
class MultiModalDocument extends Document {
  textDoc: TextDocument;
  imageDoc: ImageDocument;

  constructor(
    textDoc: TextDocument,
    imageDoc: ImageDocument,
    metadata?: Metadata
  ) {
    super(metadata);
    this.textDoc = textDoc;
    this.imageDoc = imageDoc;
  }
}
