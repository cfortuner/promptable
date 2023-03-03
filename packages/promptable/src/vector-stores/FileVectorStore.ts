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
    super();
    this.filePath = opts.filePath || `./data/${opts.name}/index.json`;
    this.name = opts.name || "default";

    this.load();
  }

  async load() {
    // load the index from the file if it exists
    if (!fs.existsSync(this.filePath)) {
      this.embeddedDocuments = [];
      return;
    }
    const jsn = fs.readFileSync(this.filePath, "utf8");

    const index = JSON.parse(jsn);

    if (index.key !== this.key) {
      throw new Error(
        `The index key ${index.key} does not match the key ${this.key}.`
      );
    }
    this.embeddedDocuments = index.embeddedDocuments;

    console.log(
      chalk.green(`Loaded index for ${this.key} from file ${this.filePath}`)
    );
  }

  async save() {
    // save the index to the file
    const index = {
      key: this.key,
      embeddedDocuments: this.embeddedDocuments,
    };
    fs.promises.writeFile(this.filePath, JSON.stringify(index), "utf8");
    console.log(
      chalk.green(`Saved index for ${this.key} to file ${this.filePath}`)
    );
  }
}
