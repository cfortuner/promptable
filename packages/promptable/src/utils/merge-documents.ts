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
    const data = documents.map((doc) => doc.data).join(separator);
    return {
      data,
      meta,
    };
  };

export const mergeDocumentsTruncated =
  (maxChars: number): MergeDocuments =>
  (documents: Document[], meta: { [key: string]: any }) => {
    let data = "";
    for (const doc of documents) {
      if (data.length + doc.data.length > maxChars) {
        break;
      }
      data += doc.data;
    }
    return {
      data,
      meta,
    };
  };
