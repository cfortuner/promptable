import { Document } from "@documents/Document";

export interface Loader<TDoc extends Document> {
  load(...args: any[]): Promise<TDoc[]>;
}
