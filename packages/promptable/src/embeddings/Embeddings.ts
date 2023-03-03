export class Embeddings<Document> {
  vector: number[];
  document: Document;

  constructor(document: Document, embeddings: number[]) {
    this.document = document;
    this.vector = embeddings;
  }
}

export interface EmbeddingsWithScore {
  embeddings: Embeddings<Document>;
  similarity: number;
}
