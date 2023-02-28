export interface Store {
  type: string;
  docs: Record<string, unknown>;

  // Get a document from the store
  get(ids: string[]): unknown[];
  get(id: string): unknown;

  // Add a document to the store
  add(doc: unknown): string;
  add(docs: unknown[]): string[];

  delete(id: string): void;
  delete(ids: string[]): void;
  update(id: string, doc: unknown): void;
  update(docs: Record<string, unknown>): void;
}
