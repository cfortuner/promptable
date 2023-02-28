import chalk from "chalk";
import { EmbeddedDocument, QueryResult, vectorSimilarity } from "..";
import { EmbeddingsStore, EmbeddingsStoreType } from "./EmbeddingsStore";

export class MemoryEmbeddingsStore implements EmbeddingsStore {
  type: EmbeddingsStoreType = "memory";
  embeddedDocuments: EmbeddedDocument[] = [];

  constructor(public key: string) {}

  async add(embeddedDocuments: EmbeddedDocument): Promise<void>;
  async add(embeddedDocuments: EmbeddedDocument[]): Promise<void>;
  async add(embeddedDocuments: EmbeddedDocument[] | EmbeddedDocument) {
    let docs = [];
    if (!Array.isArray(embeddedDocuments)) {
      docs = [embeddedDocuments];
    } else {
      docs = [...embeddedDocuments];
    }

    // add the documents to the index
    this.embeddedDocuments = this.embeddedDocuments.concat(docs);
  }

  // update documents in the index
  async update(embeddedDocuments: EmbeddedDocument): Promise<void>;
  async update(embeddedDocuments: EmbeddedDocument[]): Promise<void>;
  async update(embeddedDocuments: EmbeddedDocument[] | EmbeddedDocument) {
    let docs: EmbeddedDocument[] = [];
    if (!Array.isArray(embeddedDocuments)) {
      docs = [embeddedDocuments];
    } else {
      docs = [...embeddedDocuments];
    }

    // update the documents in the index
    this.embeddedDocuments = docs.map((embeddedDocument) => {
      const updatedEmbeddedDocument = this.embeddedDocuments.find(
        (embeddedDocument) => embeddedDocument.id === embeddedDocument.id
      );

      if (updatedEmbeddedDocument) {
        return updatedEmbeddedDocument;
      }

      return embeddedDocument;
    });
  }

  async delete(id: string): Promise<void>;
  async delete(id: string[]): Promise<void>;
  async delete(id: string | string[]) {
    if (Array.isArray(id)) {
      await Promise.all(id.map((id) => this.delete(id)));
      return;
    }

    // delete the document from the index
    this.embeddedDocuments = this.embeddedDocuments.filter(
      (embeddedDocument) => id !== embeddedDocument.id
    );
  }

  async query(embeddedQuery: number[], k: number): Promise<QueryResult[]> {
    console.log(chalk.white(`Querying File Index: ${this.key}`));

    // compute similarity
    // for each embedding in the df, compute the similarity to the query embedding
    const result = this.embeddedDocuments
      .map((embeddedDocument) => {
        const similarity = vectorSimilarity(
          embeddedDocument.embedding,
          embeddedQuery
        );
        return {
          query: embeddedQuery,
          similarity,
          document: embeddedDocument.document,
        };
      })
      .sort((a, b) => {
        return a.similarity > b.similarity ? -1 : 1;
      })
      .slice(0, k);

    return result;
  }
}

export {};
