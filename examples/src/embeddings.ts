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

import { Embeddings, OpenAI } from "promptable";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import { cwd } from "process";
import * as dfd from "danfojs-node";

const apiKey = process.env.OPENAI_API_KEY || "";
const openai = new OpenAI(apiKey);

// Using Openai cookbook embeddings
const loadData = async () => {
  const df = await dfd.readCSV(
    "https://cdn.openai.com/API/examples/data/olympics_sections_text.csv",
    {}
  );
  const embeddings = await dfd.readCSV(
    "https://cdn.openai.com/API/examples/data/olympics_sections_document_embeddings.csv",
    {}
  );

  // dont need the title and heading columns
  // embeddings.drop({ columns: ["title", "heading"] });
  const maxDim = embeddings.shape[1];
  const embeddingsOnly = embeddings.iloc({
    columns: [`0:${maxDim - 2}`],
  });

  const documents = df.values.map((row, i) => {
    const title = df.column("title").values[i];
    const heading = df.column("heading").values[i];
    const content = df.column("content").values[i] as string;

    return {
      content,
      meta: {
        title,
        heading,
      } as any,
    };
  });

  return {
    documents,
    embeddings: embeddingsOnly.values as number[][],
  };
};

/**
 * Example of using OpenAI embeddings to find document similar to a query.
 *
 * Embeds the documents and the query, then computes the cosine similarity between the embeddings.
 */
const run = async (args: string[]) => {
  console.log(chalk.blue.bold("\nRunning Example: Embeddings Olympic Games"));

  console.log(chalk.white("Loading data..."));
  const { documents, embeddings: embeddingsVector } = await loadData();

  // create your index
  const embeddings = new Embeddings("olympics", openai, documents);
  await embeddings.index(embeddingsVector);

  // query your index
  const query = "Who won the men's high jump?";

  const results = await embeddings.query(query, 1);

  // results
  console.log(chalk.green("Results:"));
  console.log(results);
};

export default run;
