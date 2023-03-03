import { Document } from "src/documents/Document";

export class ListIndex {
  documents: Document[] = [];

  clear() {
    this.documents = [];
  }
}
