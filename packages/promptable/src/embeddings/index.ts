import fs from "fs";
import chalk from "chalk";
import { EmbeddingsModelProvider } from "@providers/ModelProvider";
import { Document } from "../Document";
import { FileEmbeddingsStore } from "./stores/FileEmbeddingsStore";
import { EmbeddingsStore } from "./stores/EmbeddingsStore";

export interface EmbeddingsOptions {
  storeOptions?: Record<string, unknown>;
}

export interface QueryResult {
  query: string | number[];
  document: Document;
  similarity: number;
}

export class Embeddings {
  key: string;
  provider: EmbeddingsModelProvider;
  documents: Document[] = [];
  embeddings: number[][] = [];
  store: EmbeddingsStore;

  constructor(
    key: string,
    provider: EmbeddingsModelProvider,
    documents: Document[],
    options?: EmbeddingsOptions
  ) {
    this.key = key;
    this.provider = provider;

    this.documents = documents;

    this.store = new FileEmbeddingsStore(this.key);
  }

  async index(embeddings?: number[][]) {
    if (embeddings) {
      if (embeddings.length !== this.documents.length) {
        throw new Error(
          "The number of embeddings must match the number of documents."
        );
      }

      this.embeddings = embeddings;

      // add the documents to the store
      this.store.add(
        this.documents.map((doc, i) => ({
          ...doc,
          embedding: embeddings[i],
        }))
      );
      return;
    }

    console.log(chalk.white(`Indexing Documents: ${this.documents.length}`));

    // check if the index already exists
    const hasDocuments = (await this.store.size()) > 0;
    if (hasDocuments) {
      console.log(
        chalk.yellow(
          `Index for ${this.key} already exists. Loading from cache...`
        )
      );
      return;
    }

    console.log(chalk.white(`Creating Embeddings: ${this.documents.length}`));

    // create the embeddings
    for (let i = 0; i < this.documents.length; i++) {
      const embedding =
        // use the provided embeddings if they exist
        this.embeddings?.[i] ||
        // otherwise, create the embedding
        (await this.provider.createEmbeddings({
          input: this.documents[i].data,
        }));

      this.embeddings.push(embedding);
      this.store.add({
        ...this.documents[i],
        embedding: embedding,
      });
    }
  }

  isInitialized() {
    return (
      this.embeddings.length > 0 &&
      this.documents.length > 0 &&
      this.embeddings?.length === this.documents.length
    );
  }

  async query(query: number[], k: number): Promise<QueryResult[]>;
  async query(query: string, k: number): Promise<QueryResult[]>;
  async query(query: string | number[], k: number) {
    if (!this.isInitialized()) {
      throw new Error("Index not initialized. Call index() or load() first.");
    }

    console.log(chalk.white(`Querying Index: ${this.key}`));

    let queryEmbedding: number[];

    if (typeof query === "string") {
      const embedding = await this.provider.createEmbeddings({
        input: query,
      });

      queryEmbedding = embedding.embeddings[0];
    }

    // compute similarity
    // for each embedding in the df, compute the similarity to the query embedding
    // create objects to represent the results
    const similarity = this.embeddings.map((row: any) => {
      return vectorSimilarity(row, queryEmbedding);
    });

    const documents = similarity
      .map((similarity, i) => {
        return {
          document: this.documents[i],
          similarity,
          query,
        };
      })
      .sort((a, b) => {
        return a.similarity > b.similarity ? -1 : 1;
      })
      .slice(0, k);

    return documents;
  }

  update(data: string[]) {
    console.warn("not implemented yet :p");
  }
  delete(data: string[]) {
    console.warn("not implemented yet :p");
  }
}

export interface EmbeddedDocument extends Document {
  embedding: number[];
  score?: number;
}

/**
 * Computes the cosine similarity between two embedding vectors.
 *
 * ## Notes
 *
 * - Since OpenAI embeddings are normalized, the dot product is equivalent to the cosine similarity.
 *
 * @private
 * @param x - first vector
 * @param y - second vector
 * @returns dot product
 */
export function vectorSimilarity(x: number[], y: number[]): number {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }
  return sum;
}
