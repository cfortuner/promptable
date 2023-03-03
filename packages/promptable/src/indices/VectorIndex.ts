import { Document } from "src/documents/Document";
import { VectorStore } from "src/vector-stores/VectorStore";

export abstract class VectorIndex<TDoc extends Document> {
  abstract store: VectorStore<TDoc>;
  abstract index(docs: TDoc[]): Promise<void>;
}
