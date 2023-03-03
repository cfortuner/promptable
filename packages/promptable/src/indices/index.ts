import { v4 as uuid } from "uuid";
import { Document } from "src/documents/Document";

export abstract class Index {
  constructor(documents: Document[] = []) {
    this.build(documents);
  }

  protected abstract build(documents: Document[]): void;

  abstract insert(documents: Document[]): void;
  abstract insert(document: Document): void;
  abstract delete(docId: string): void;
  abstract query(queryStr: string): any;
  abstract get(docId: string): Document | undefined;
  abstract get(): Document[];
}

export class ListIndex extends Index {
  index: Document[] = [];

  constructor(documents: Document[] = []) {
    super(documents);
  }

  protected build(documents: Document[]) {
    documents.forEach((doc) => {
      const id = doc.id || uuid();
      this.index.push({ ...doc, id });
    });
  }

  insert(doc: Document): void;
  insert(docs: Document[]): void;
  insert(docOrDocs: Document | Document[]) {
    if (Array.isArray(docOrDocs)) {
      docOrDocs.forEach((doc) => {
        const id = doc.id || uuid();
        this.index.push({
          ...doc,
          id,
        });
      });
    } else {
      const id = docOrDocs.id || uuid();
      this.index.push({
        ...docOrDocs,
        id,
      });
    }
  }

  delete(docId: string) {
    this.index = this.index.filter((doc) => doc.id !== docId);
  }
  query(queryStr: string) {
    // extractor / retreiver
    return this.index.filter((doc) => {
      return Object.values(doc).some((value) => {
        if (typeof value === "string") {
          return value.includes(queryStr);
        }
        return false;
      });
    });
  }

  get(docId: string): Document | undefined;
  get(): Document[];
  get(docId?: string) {
    if (docId) {
      return this.index.find((doc) => doc.id === docId);
    }

    return this.index;
  }
}
