import { Document } from "@documents/Document";

export class Embeddings<TDoc extends Document> {
  vector: number[];
  document: TDoc;

  constructor(document: TDoc, vector: number[]) {
    this.document = document;
    this.vector = vector;
  }

  toJSON() {
    return {
      vector: this.vector,
      document: this.document.toJSON(),
    };
  }
}

export interface EmbeddingsWithScore {
  embeddings: Embeddings<Document>;
  similarity: number;
}
