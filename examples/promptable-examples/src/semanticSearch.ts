  import dotenv from "dotenv";
  dotenv.config();
  import axios from "axios";
  import { PromptStep, SequentialChain, OpenAI, z, Prompt } from "promptable";
  import dfd, { readCSV } from "danfojs-node";
  import { Configuration, OpenAIApi } from "openai";

  const apiKey = process.env.OPENAI_API_KEY || "missing";

  function vectorSimilarity(x: number[], y: number[]): number {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += x[i] * y[i];
    }

    return sum;
  }

  export default async function run() {
    const configuration = new Configuration({ apiKey: apiKey });
    const openai = new OpenAIApi(configuration);
    console.log("hello")

    const df = await readCSV(
      "https://github.com/openai/openai-cookbook/raw/main/examples/data/fine_food_reviews_with_embeddings_1k.csv"
    );
    
    const input = "delicious beans";
    const embeddingResponse = await openai.createEmbedding({
      input: input,
      model: "text-embedding-ada-002"
    })
    const embedding = embeddingResponse.data.data[0].embedding;

    df.addColumn("similarity", df.column("embedding").apply((x) => vectorSimilarity(JSON.parse(x), embedding)), {inplace: true});
    df.sortValues("similarity", {ascending: false}).head(5).column("Text").print()
  }
