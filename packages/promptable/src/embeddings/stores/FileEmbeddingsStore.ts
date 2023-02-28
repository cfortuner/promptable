import fs from "fs";
import chalk from "chalk";
import { EmbeddedDocument, QueryResult, vectorSimilarity } from "..";
import { EmbeddingsStore, EmbeddingsStoreType } from "./EmbeddingsStore";
import { MemoryEmbeddingsStore } from "./MemoryEmbeddingsStore";

export class FileEmbeddingsStore
  extends MemoryEmbeddingsStore
  implements EmbeddingsStore
{
  readonly type: EmbeddingsStoreType = "file";

  fileDir: string;
  embeddedDocuments: EmbeddedDocument[] = [];

  constructor(public key: string, fileDir?: string) {
    super(key);
    this.fileDir = fileDir || `./data/stores/embeddings/${key}/index`;
    this.key = key;
    this.load();
  }

  async size() {
    return this.embeddedDocuments.length;
  }

  load() {
    // load the index from the file if it exists
    if (!fs.existsSync(`${this.fileDir}/${this.key}.json`)) {
      this.embeddedDocuments = [];
      return;
    }
    const jsn = fs.readFileSync(`${this.fileDir}/${this.key}.json`, "utf8");

    const index = JSON.parse(jsn);

    if (index.key !== this.key) {
      throw new Error(
        `The index key ${index.key} does not match the key ${this.key}.`
      );
    }
    this.embeddedDocuments = index.embeddedDocuments;

    console.log(
      chalk.green(`Loaded index for ${this.key} from file ${this.fileDir}`)
    );
  }

  save() {
    // save the index to the file
    const index = {
      key: this.key,
      embeddedDocuments: this.embeddedDocuments,
    };
    fs.writeFileSync(
      `${this.fileDir}/${this.key}.json`,
      JSON.stringify(index),
      "utf8"
    );
    console.log(
      chalk.green(`Saved index for ${this.key} to file ${this.fileDir}`)
    );
  }

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

    this.save();
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

    this.save();
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

    this.save();
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
