import fs from "fs";
import { Loader } from ".";

export class FileLoader implements Loader {
  path: string;
  meta?: Record<string, any>;

  constructor(path: string, meta?: Record<string, any>) {
    this.path = path;
    this.meta = meta;
  }

  async load() {
    const data = await fs.promises.readFile(this.path, "utf-8");
    return [
      {
        data,
        meta: {
          source: this.path,
          ...this.meta,
        },
      },
    ];
  }
}
