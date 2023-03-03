import { Document } from "../documents/Document";

export interface Loader {
  load(...args: any[]): Promise<Document[]>;
}
