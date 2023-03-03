import { PineconeClient } from "@pinecone-database/pinecone";
import { CreateIndexRequest } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import { Document } from "src/documents/Document";
import { Embeddings } from "src/embeddings/Embeddings";
import { AddRequest, QueryRequest, VectorStore } from "./VectorStore";

export interface PineconeAddRequest<TDoc extends Document>
  extends AddRequest<TDoc> {
  indexName: string;
}

export class PineconeVectorStore<
  TDoc extends Document
> extends VectorStore<TDoc> {
  pinecone: PineconeClient;
  documentGetter: (id: string) => Promise<TDoc>;

  constructor(params: {
    pineconeApiKey: string;
    environment: string;
    documentGetter: (id: string) => Promise<TDoc>;
  }) {
    super();
    const { pineconeApiKey } = params;
    this.pinecone = new PineconeClient();
    this.pinecone.init({
      apiKey: pineconeApiKey,
      environment: "production",
    });

    this.documentGetter = params.documentGetter;
  }

  async createIndex(req: CreateIndexRequest) {
    if (!req.createRequest) {
      throw Error("Need a valid createRequest to create a Pinecone index");
    }

    await this.pinecone.createIndex(req);
  }

  async add(req: PineconeAddRequest<TDoc>) {
    await this.pinecone.Index(req.indexName).upsert({
      upsertRequest: {
        vectors: req.embeddings.map((embedding, i) => {
          return {
            id: embedding.document.id,
            values: embedding.vector,
            metadata: embedding.document.metadata,
          };
        }),
      },
    });
  }

  async delete(req: { indexName: string; ids: string[] }) {
    await this.pinecone.Index(req.indexName).delete1({
      ids: req.ids,
    });
  }

  async query(req: QueryRequest<TDoc> & { indexName: string }) {
    const response = await this.pinecone.Index(req.indexName).query({
      queryRequest: {
        vector: req.embeddings.vector,
        topK: req.k || 10,
      },
    });

    let results = [];
    for (const r of response.matches || []) {
      const document = await this.documentGetter(r.id);

      results.push({
        embeddings: new Embeddings(document, r.values || []),
        score: r.score || 0,
      });
    }

    return { results };
  }

  async save() {}
  async load() {}
}
