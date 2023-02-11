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

import { OpenAI } from "promptable";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import chalk from "chalk";
import * as dfd from "danfojs-node";
import { cwd } from "process";
import { DataFrame } from "danfojs-node/dist/danfojs-base";

const apiKey = process.env.OPENAI_API_KEY || "";
const EMBEDDING_MODEL = "text-embedding-ada-002";
const openai = new OpenAI(apiKey);

async function createEmbedding(text: string, model: string = EMBEDDING_MODEL) {
  const result = await openai.embed(text);

  return result?.data;
}

/**
 * Computes the cosine similarity between two embedding vectors.
 *
 * ## Notes
 *
 * - Since OpenAI embeddings are normalized, the dot product is equivalent to the cosine similarity.
 *
 * @private
 * @param x - first vector
 * @param y - second vector
 * @returns dot product
 */
export function vectorSimilarity(x: number[], y: number[]): number {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }
  return sum;
}

async function readDataset() {
  if (fs.existsSync(`${cwd()}/data/cache/olympics_sections_text.json`)) {
    try {
      const df = await dfd.readJSON(
        `${cwd()}/data/cache/olympics_sections_text.json`
      );
      return df as DataFrame;
    } catch (e) {
      console.error(e);
    }
  }

  const df = await dfd.readCSV(
    "https://cdn.openai.com/API/examples/data/olympics_sections_text.csv",
    {}
  );

  dfd.toJSON(df, {
    filePath: `${cwd()}/data/cache/olympics_sections_text.json`,
  });

  return df;
}

async function loadOpenAIEmbeddings() {
  if (
    fs.existsSync(
      `${cwd()}/data/cache/olympics_sections_document_embeddings.json`
    )
  ) {
    try {
      const df = await dfd.readJSON(
        `${cwd()}/data/cache/olympics_sections_document_embeddings.json`
      );
      return df as DataFrame;
    } catch (e) {
      console.error(e);
    }
  }

  const df = await dfd.readCSV(
    "https://cdn.openai.com/API/examples/data/olympics_sections_document_embeddings.csv",
    {}
  );

  dfd.toJSON(df, {
    filePath: `${cwd()}/data/cache/olympics_sections_document_embeddings.json`,
  });

  return df;
}

const CACHED_EMBEDDINGS_FILEPATH = `${cwd()}/data/cache/olympics_sections_document_embeddings-generated.csv`;

async function loadEmbeddings(
  path: string = CACHED_EMBEDDINGS_FILEPATH,
  cache = true
) {
  // use caching
  if (cache) {
    try {
      const df = await dfd.readJSON(path);

      // cache locally
      dfd.toJSON(df as any, {
        filePath: CACHED_EMBEDDINGS_FILEPATH,
      });

      return df;
    } catch (e) {
      console.error(e);
    }
  }

  return await createEmbeddings();
}

async function createEmbeddings() {
  // load the data
  let df = await readDataset();

  // create the embeddings using the content in the dataframe
  let i = 0;
  for (let i = 0; i < df.column("content").values.length; i++) {
    const content = df.column("content").values[i] as string;

    // create embedding
    const embedding = await createEmbedding(content);

    // add each embedding to the dataframe as a separate column
    const colId = (i + 1).toString();
    df.addColumn(colId, embedding.data[0].embedding, {
      inplace: true,
    });
    i++;
  }

  // cache the embeddings
  dfd.toJSON(df, {
    filePath: CACHED_EMBEDDINGS_FILEPATH,
  });

  return df;
}

async function processDocuments() {
  // read the wikipedia data in from oai
  const dataDF = await readDataset();

  const embeddingsDF = await loadOpenAIEmbeddings();
  // uncomment to generate your own embeddings
  // const embeddingsDF = await loadEmbeddings(undefined, false);

  return {
    dataDF,
    embeddingsDF,
  };
}

/**
 * Example of using OpenAI embeddings to find document similar to a query.
 *
 * Embeds the documents and the query, then computes the cosine similarity between the embeddings.
 *
 * @param args
 */
const run = async (args: string[]) => {
  const { dataDF, embeddingsDF } = await processDocuments();

  const query = "Who won the men's high jump?";

  // Create the embedding for the query
  const queryEmbeddingResponse = await createEmbedding(query, EMBEDDING_MODEL);
  const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

  // for each embedding in the df, compute the similarity to the query embedding
  // Note: right now, embeddings are stored in the dataframe as separate columns
  // so we need to create a new dataframe with only the embeddings (not the title, heading, etc.)
  const maxDim = embeddingsDF.shape[1];
  const embeddingsOnly = embeddingsDF.iloc({
    columns: [`0:${maxDim - 2}`],
  });

  // create objects to represent the results
  const results = embeddingsOnly.values.map((row: any, i) => {
    const title = embeddingsDF.column("title").values[i];
    const heading = embeddingsDF.column("heading").values[i];
    const similarity = vectorSimilarity(row, queryEmbedding);
    const content = dataDF.column("content").values[i];

    return {
      title,
      heading,
      content,
      embeddings: row,
      similarity,
    };
  });

  // sort the results by similarity
  const sorted = results.sort((a, b) => b.similarity - a.similarity);

  console.log(query);
  console.log(sorted.slice(0, 1));
};

export default run;
