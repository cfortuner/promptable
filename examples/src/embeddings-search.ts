import dotenv from "dotenv";
dotenv.config();
import { readCSV } from "danfojs-node";
import { Embeddings, OpenAI } from "promptable";
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

export default async function run() {
  const openai = new OpenAI(apiKey);

  // just loading embeddings from oai for now
  const df = await readCSV(
    "https://github.com/openai/openai-cookbook/raw/main/examples/data/fine_food_reviews_with_embeddings_1k.csv"
  );

  const documents = df.column("Text").values.map((x: any) => {
    return {
      content: x,
      meta: {},
    };
  });
  const embeddingsVector = df.column("embedding").values.map((x: any) => {
    return JSON.parse(x);
  });

  const query = "delicious beans";

  // todo: build index around this idea

  const embeddings = new Embeddings("fine-food", openai, documents);
  await embeddings.index(embeddingsVector);

  console.log(chalk.blue("Query: " + query));
  const result = await embeddings.query(query, 1);

  console.log(chalk.green(JSON.stringify(result[0])));
}
