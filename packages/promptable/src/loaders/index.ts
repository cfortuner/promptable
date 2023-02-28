import fs from "fs";
import { Document } from "..";

export interface Loader {
  load(...args: any[]): Promise<Document[]>;
}
