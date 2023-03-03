import fs from "fs";
import chalk from "chalk";
import { InMemoryVectorStore } from "./InMemoryVectorStore";
import { Document } from "src/documents/Document";

export interface FileVectorStoreOptions {
  name: string;
  filePath?: string;
}

export class FileVectorStore<
  TDoc extends Document
> extends InMemoryVectorStore<TDoc> {
  name: string;
  filePath: string;

  constructor(opts: FileVectorStoreOptions) {
    super(opts);
    this.filePath = opts.filePath || `./data/${opts.name}/index.json`;
    this.name = opts.name || "default";

    this.load();
  }

  async load() {
    // load the index from the file if it exists
    if (!fs.existsSync(this.filePath)) {
      this.embeddings = [];
      return;
    }
    const jsn = fs.readFileSync(this.filePath, "utf8");

    const index = JSON.parse(jsn);

    this.embeddings = index.embeddedDocuments;
  }

  async save() {
    // save the index to the file
    const index = this.toJSON();

    fs.promises.writeFile(this.filePath, JSON.stringify(index), "utf8");
  }

  toJSON() {
    return {
      name: this.name,
      filePath: this.filePath,
      embeddings: this.embeddings.map((emb) => emb.toJSON()),
    };
  }
}
