import { EmbeddedDocument, QueryResult } from "..";

export type EmbeddingsStoreType = "file" | "pinecone" | "memory";

export interface EmbeddingsStore {
  type: EmbeddingsStoreType;
  key: string;

  size(): Promise<number>;

  // Query the store
  query(embeddings: number[], k: number): Promise<QueryResult[]>;

  // add documents to the store
  add(doc: EmbeddedDocument): Promise<void>;
  add(docs: EmbeddedDocument[]): Promise<void>;

  // update a document in the store
  update(doc: EmbeddedDocument): Promise<void>;
  update(docs: EmbeddedDocument): Promise<void>;

  // Delete a document from the store
  delete(id: string): Promise<void>;
  delete(ids: string[]): Promise<void>;
}
