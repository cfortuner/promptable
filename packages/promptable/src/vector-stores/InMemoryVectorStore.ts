import { vectorSimilarity } from "@utils/vector-similarity";
import { Document } from "src/documents/Document";
import { Embeddings } from "src/embeddings/Embeddings";
import {
  AddRequest,
  QueryRequest,
  QueryResponse,
  VectorStore,
} from "./VectorStore";

export interface InMemoryVectorStoreOptions {
  name: string;
}

export class InMemoryVectorStore<
  TDoc extends Document
> extends VectorStore<TDoc> {
  name: string;

  protected embeddings = new Array<Embeddings<TDoc>>();

  constructor(opts: InMemoryVectorStoreOptions) {
    super();
    this.name = opts.name;
  }

  async add(addReq: AddRequest<TDoc>) {
    this.embeddings.concat(addReq.embeddings);
  }

  async query(req: QueryRequest<TDoc>): Promise<QueryResponse<TDoc>> {
    // compute similarity
    // for each embedding in the df, compute the similarity to the query embedding
    const results = this.embeddings
      .map((emb, i) => {
        const similarity = vectorSimilarity(emb.vector, req.embeddings.vector);
        return {
          embeddings: emb,
          score: similarity,
        };
      })
      .sort((a, b) => {
        return req.sort === "desc"
          ? a.score > b.score
            ? 1
            : -1
          : a.score > b.score
          ? -1
          : 1;
      })
      .slice(0, req.k || this.embeddings.length);

    return { results };
  }

  async save() {
    // do nothing
  }

  async load() {
    // do nothing
  }
}

export {};
