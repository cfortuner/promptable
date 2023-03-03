import { v4 as uuid } from "uuid";

export interface Metadata {
  [key: string]: any;
}

export interface CreateDocumentOptions {
  id?: string;
  metadata?: Metadata;
}

export abstract class Document {
  id: string;
  metadata: Metadata;

  constructor(params: CreateDocumentOptions) {
    this.id = params.id || uuid();
    this.metadata = params.metadata || {};
  }
}

// factory function for creating a document base on the type
const createDocument = (params: CreateDocumentOptions) => {};

// // example of a multi-modal document
// class MultiModalDocument extends Document {
//   textDoc: TextDocument;
//   imageDoc: ImageDocument;

//   constructor(
//     textDoc: TextDocument,
//     imageDoc: ImageDocument,
//     metadata?: Metadata
//   ) {
//     super(metadata);
//     this.textDoc = textDoc;
//     this.imageDoc = imageDoc;
//   }
// }
