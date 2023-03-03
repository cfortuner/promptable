import { Document } from "src/documents/Document";
import { Embeddings } from "src/embeddings/Embeddings";

export abstract class VectorStore<TDoc extends Document> {
  abstract query(
    queryRequest: QueryRequest<TDoc>
  ): Promise<QueryResponse<TDoc>>;
  abstract add(addRequest: AddRequest<TDoc>): Promise<void>;
  abstract save(): Promise<void>;
  abstract load(): Promise<void>;
}

export interface QueryRequest<TDoc extends Document> {
  indexName?: string;
  embeddings: Embeddings<TDoc>;
  k?: number;
  sort?: "asc" | "desc";
}

export interface QueryResult<TDoc extends Document> {
  embeddings: Embeddings<TDoc>;
  score: number;
}

export interface QueryResponse<TDoc extends Document> {
  results: QueryResult<TDoc>[];
}

export interface AddRequest<TDoc extends Document> {
  embeddings: Embeddings<TDoc>[];
}
