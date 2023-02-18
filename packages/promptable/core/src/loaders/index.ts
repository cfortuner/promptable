import fs from "fs";
import { Document } from "..";

export interface Loader {
  load(): Promise<Document[]>;
}

export class FileLoader implements Loader {
  path: string;
  meta?: Record<string, any>;

  constructor(path: string, meta?: Record<string, any>) {
    this.path = path;
    this.meta = meta;
  }

  /**
   * Load a file from the filesystem
   *
   * @returns {Promise<Document[]>} A promise that resolves to an array of documents
   */
  async load(): Promise<Document[]> {
    const content = await fs.promises.readFile(this.path, "utf-8");
    return [
      {
        content,
        meta: {
          source: this.path,
          ...this.meta,
        },
      },
    ];
  }
}
