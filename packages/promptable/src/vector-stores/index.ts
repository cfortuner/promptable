import { FileVectorStore } from "./FileVectorStore";
import { InMemoryVectorStore } from "./InMemoryVectorStore";
import { PineconeVectorStore } from "./PineconeVectorStore";
import { VectorStore } from "./VectorStore";

export const VectorStores = {
  FileVectorStore,
  InMemoryVectorStore,
  PineconeVectorStore,
  VectorStore,
};

export type { VectorStore };
