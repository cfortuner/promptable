import fs from "fs";
import { Document } from "..";

export interface Loader {
  load(): Document[];
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
   * @returns {Document[]} An array of documents
   */
  load(): Document[] {
    const content = fs.readFileSync(this.path, "utf-8");
    return [
      {
        content,
        meta: {
          source: this.path,
          format: "text",
          encoding: "utf-8",
          ...this.meta,
        },
      },
    ];
  }
}
