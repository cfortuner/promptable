/**
Question Answering

Method for augmenting GPT-3 with a large body of additional contextual information by using document embeddings and retrieval.

This method answers queries in two steps:

1. retrieves the information relevant to the query,
2. writes an answer tailored to the question based on the retrieved information.

The first step uses the Embeddings API, the second step uses the Completions API.

The steps are:

1. Preprocess the contextual information by splitting it into chunks and create an embedding vector for each chunk.
2. On receiving a query, embed the query in the same vector space as the context chunks and find the context embeddings which are most similar to the query.
3. Prepend the most relevant context embeddings to the query prompt.
    4. Submit the question along with the most relevant context to GPT, and receive an answer which makes use of the provided contextual information.
**/

import {
  Loaders,
  Documents,
  OpenAI,
  Splitters,
  VectorStores,
} from "@promptable/promptable";
import dotenv from "dotenv";
dotenv.config();
import chalk from "chalk";

const apiKey = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI(apiKey);

/**
 * A simple example of creating embeddings.
 *
 * @param args
 */
const run = async (args: string[]) => {
  console.log(chalk.blue.bold("\nRunning Example: Create embeddings"));

  const filepath = "./data/startup-mistakes.txt";
  const loader = new Loaders.FileLoader();
  const splitter = new Splitters.SentenceTextSplitter();

  const documents = await loader.loadTexts([filepath]);

  // split the documents into sentences
  const sentences = splitter.splitDocuments(documents, {
    chunk: false,
  });

  console.log(chalk.green("Sentences:"));
  console.log(sentences);

  // create your embeddings
  const { embeddings } = await openai.createEmbeddings({
    docs: sentences,
  });

  // create your store
  const vectorStore = new VectorStores.InMemoryVectorStore({
    name: "startup-mistakes",
  });

  // add your embeddings to the store
  vectorStore.add({
    embeddings,
  });

  // create your query
  const queryDoc = new Documents.TextDocument({
    text: "What is the worst mistake a startup can make?",
  });
  const { embeddings: queryEmbeddings } = await openai.createEmbeddings({
    docs: [queryDoc],
  });

  const results = await vectorStore.query({
    embeddings: queryEmbeddings[0],
  });

  // results
  console.log(chalk.green("Results:"));
  console.log(results);
};

export default run;
