export type DocumentReference = {
  id: string;
};

export type DataType = string;

export interface Document {
  id?: string;
  data: DataType;
  meta?: Record<string, any>;
}

interface NodeDocument extends Document {
  children: Set<DocumentReference>;
  embedding?: number[];
  meta?: Record<string, any>;
  addChildren(children: DocumentReference[]): void;
}

export class Node implements NodeDocument {
  children: Set<DocumentReference> = new Set();
  embedding: number[] = [];
  meta: Record<string, any> = {};

  constructor(
    public id: string,
    public data: DataType,
    children?: DocumentReference[],
    embedding?: number[],
    meta?: Record<string, any>
  ) {
    if (children) {
      this.addChildren(children);
    }

    if (embedding) {
      this.embedding = embedding;
    }

    if (meta) {
      this.meta = meta;
    }
  }

  addChildren(children: DocumentReference[]) {
    for (const child of children) {
      this.children.add(child);
    }
  }
}
