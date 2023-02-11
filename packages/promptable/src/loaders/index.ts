import glob from "glob";
import fs from "fs";
import { Document } from "..";

export abstract class Loader {
  abstract load(): Document[];
}

export class FileLoader extends Loader {
  path: string;
  meta?: Record<string, any>;

  constructor(path: string, meta?: Record<string, any>) {
    super();
    this.path = path;
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
