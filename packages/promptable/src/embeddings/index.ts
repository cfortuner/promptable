import fs from "fs";
import chalk from "chalk";
import { cwd } from "process";
import { Prompt } from "@prompts/Prompt";
import {
  CompletionsModelProvider,
  EmbeddingsModelProvider,
} from "@providers/ModelProvider";
import { Document } from "src";

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

interface EmbeddingsOptions {
  cacheDir?: string;
}

interface QueryResult {
  query: string | number[];
  document: Document;
  similarity: number;
}

export class Embeddings {
  key: string;
  cacheDir: string;
  provider: EmbeddingsModelProvider;
  documents: Document[] = [];
  embeddings: number[][] = [];

  constructor(
    key: string,
    provider: EmbeddingsModelProvider,
    documents: Document[],
    options?: EmbeddingsOptions
  ) {
    this.key = key;
    this.provider = provider;
    this.cacheDir = options?.cacheDir || `${cwd()}/data/cache/index`;

    this.documents = documents;
  }

  isCached() {
    return fs.existsSync(`${this.cacheDir}/${this.key}.json`);
  }

  clearCache() {
    fs.rmSync(`${this.cacheDir}/${this.key}.json`, { force: true });

    this.embeddings = [];
  }

  load() {
    // load the index from cache
    const jsn = fs.readFileSync(`${this.cacheDir}/${this.key}.json`, "utf8");

    const index = JSON.parse(jsn);

    if (index.key !== this.key) {
      throw new Error(
        `The index key ${index.key} does not match the key ${this.key}.`
      );
    }

    if (index.documents.length !== this.documents.length) {
      throw new Error(
        `The number of documents in the index ${index.documents.length} does not match the number of documents ${this.documents.length}.`
      );
    }

    this.embeddings = index.embeddings;
    this.documents = index.documents;

    console.log(chalk.green(`Loaded index for ${this.key} from cache.`));
  }

  async index(embeddings?: number[][]) {
    if (embeddings) {
      if (embeddings.length !== this.documents.length) {
        throw new Error(
          "The number of embeddings must match the number of documents."
        );
      }

      this.embeddings = embeddings;

      // cache the index
      this.save();
      return;
    }

    console.log(chalk.white(`Indexing Documents: ${this.documents.length}`));

    // check if the index already exists
    if (this.isCached()) {
      console.log(
        chalk.yellow(
          `Index for ${this.key} already exists. Loading from cache...`
        )
      );
      this.load();
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
          input: this.documents[i].content,
        }));

      this.embeddings.push(embedding);
    }

    this.save();
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

  save() {
    // save the dataframe to a json file with key as the filename
    const cachePath = `${this.cacheDir}/${this.key}.json`;

    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }

    fs.writeFileSync(
      cachePath,
      JSON.stringify({
        key: this.key,
        embeddings: this.embeddings,
        documents: this.documents,
      })
    );
  }
}

// /**
//  * An interface for extracting answers from Embeddings
//  * using a Prompt
//  */
// interface Extractor {
//   new (index: Embeddings, provider: CompletionsModelProvider): Extractor;

//   extract<T extends string>(
//     query: string,
//     prompt: Prompt<T>,
//     variables: T[]
//   ): string[];
// }
