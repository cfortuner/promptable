import { Document } from "src";

export interface MergeDocuments {
  (
    documents: Document[],
    metadata: { [key: string]: any },
    ...args: any[]
  ): Document;
}

export const mergeDocumentsWithSeparator =
  (separator: string): MergeDocuments =>
  (documents: Document[], meta: { [key: string]: any }) => {
    const content = documents.map((doc) => doc.content).join(separator);
    return {
      content,
      meta,
    };
  };

export const mergeDocumentsTruncated =
  (maxChars: number): MergeDocuments =>
  (documents: Document[], meta: { [key: string]: any }) => {
    let content = "";
    for (const doc of documents) {
      if (content.length + doc.content.length > maxChars) {
        break;
      }
      content += doc.content;
    }
    return {
      content,
      meta,
    };
  };
