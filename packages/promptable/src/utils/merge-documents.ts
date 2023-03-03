import { Metadata } from "@documents/Document";
import { TextDocument } from "@documents/TextDocument";

export interface MergeDocuments {
  (documents: TextDocument[], metadata: Metadata, ...args: any[]): TextDocument;
}

export const mergeDocumentsWithSeparator =
  (separator: string): MergeDocuments =>
  (documents: TextDocument[], meta: Metadata) => {
    const text = documents.map((doc) => doc.text).join(separator);
    return new TextDocument({ text, metadata: meta });
  };
