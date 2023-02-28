// export class PineconeEmbeddingsStore extends Store implements EmbeddingsStore {
//   pinecone: PineconeClient<any>;
//   // pinecone does not store documents themselves, only emebedding vectors so we need to provide a function to retrieve them
//   // usually this would be a function that queries the database
//   documentGetter: (ids: string[]) => Promise<Document[]>;
//   constructor(params: {
//     pineconeApiKey: string;
//     baseUrl: string;
//     namespace?: string;
//     documentGetter: (ids: string[]) => Promise<Document[]>;
//   }) {
//     super("pinecone");
//     const { pineconeApiKey, baseUrl, namespace } = params;
//     const pinecone = new PineconeClient({
//       apiKey: pineconeApiKey,
//       baseUrl,
//       namespace,
//     });
//     this.pinecone = pinecone;
//     this.documentGetter = params.documentGetter;
//   }

//   async upsert(embeddedDocuments: EmbeddedDocument[]) {
//     this.pinecone.upsert({
//       vectors: embeddedDocuments.map((embeddedDocument) => {
//         return {
//           id: embeddedDocument.id,
//           values: embeddedDocument.embedding,
//           metadata: undefined,
//         };
//       }),
//     });
//   }

//   async delete(ids: string[]) {
//     this.pinecone.delete({ ids });
//   }

//   async query(EmbeddedQuery: number[], k: number): Promise<QueryResult[]> {
//     console.log(chalk.white(`Querying Pinecone Index`));
//     const response = await this.pinecone.query({
//       vector: EmbeddedQuery,
//       topK: k,
//     });
//     const result = response.matches.map((r) => {
//       return {
//         similarity: r.score,
//         id: r.id,
//       };
//     });
//     const document = await this.documentGetter(result.map((r) => r.id));
//     // this assumes that the order of the results is the same as the order of the documents
//     const finalResult = result.map((r, i) => {
//       return {
//         similarity: r.similarity,
//         document: document[i],
//       };
//     });
//     return finalResult;
//   }
// }

export {};
