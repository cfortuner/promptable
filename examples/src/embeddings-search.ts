import dotenv from "dotenv";
dotenv.config();
import { readCSV, toJSON } from "danfojs-node";
import { OpenAI } from "promptable";
import chalk from "chalk";

/**
 * Semantic Search with Embeddings
 * 
  The simplest way to use embeddings for search is as follows:
  Before the search (precompute):
  - Split your text corpus into chunks smaller than the token limit (8,191 tokens for text-embedding-ada-002)
  - Embed each chunk of text
  - Store those embeddings in your own database or in a vector search provider like Pinecone or Weaviate

  At the time of the search (live compute):

  - Embed the search query
  - Find the closest embeddings in your database
  - Return the top results 
  * 
  */

const apiKey = process.env.OPENAI_API_KEY || "missing";

function vectorSimilarity(x: number[], y: number[]): number {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }

  return sum;
}

export default async function run() {
  const openai = new OpenAI(apiKey);

  // just loading embeddings from oai for now
  const df = await readCSV(
    "https://github.com/openai/openai-cookbook/raw/main/examples/data/fine_food_reviews_with_embeddings_1k.csv"
  );

  const query = "delicious beans";

  // todo: build index around this idea

  // embed the input
  const embeddingResponse = await openai.embed(query);
  const embedding = embeddingResponse.data[0].embedding;

  // compute similarity
  df.addColumn(
    "similarity",
    df
      .column("embedding")
      .apply((x: any) => vectorSimilarity(JSON.parse(x), embedding)),
    { inplace: true }
  );

  console.log(chalk.blue("Query: " + query));
  // sort by similarity
  const col = df
    .sortValues("similarity", { ascending: false })
    .head(1)
    .column("Text");

  console.log(chalk.green(JSON.stringify(toJSON(col), undefined, 2)));
}
