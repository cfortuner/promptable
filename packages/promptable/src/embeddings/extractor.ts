// /**
//  * An interface for extracting answers from Embeddings
//  * using a Prompt
//  */
// interface Extractor {
//   new (index: Embeddings, provider: CompletionsModelProvider): Extractor;

//   extract<T extends string>(
//     query: string,
//     prompt: Prompt<T>,
//     variables: T[]
//   ): string[];
// }

export {};
