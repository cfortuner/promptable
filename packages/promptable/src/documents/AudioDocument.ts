import { CreateDocumentOptions, Document, Metadata } from "./Document";

interface CreateAudioDocumentOptions extends CreateDocumentOptions {
  audio: Uint8Array;
}

export class AudioDocument extends Document {
  audio: Uint8Array; // blob

  constructor(opts: CreateAudioDocumentOptions) {
    super(opts);
    this.audio = opts.audio;
  }

  toJSON() {
    return {
      id: this.id,
      metadata: this.metadata,
      audio: this.audio,
    };
  }

  static fromJSON(json: any) {
    return new AudioDocument(json);
  }
}
