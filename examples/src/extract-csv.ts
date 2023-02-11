import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { ExtractCSVPrompt, providers } from "promptable";

/**
 * Extract CSV from Data
 *
 * The ExtractCSVPrompt is a prompt that uses for data and a header definitions
 * and then returns the CSV representation of the data.
 *
 * It also has a parser that parses the CSV output into a CSV object
 * or throws an error if the output is invalid.
 */
export default async function run() {
  const apiKey = process.env.OPENAI_API_KEY || "missing";

  const openai = new providers.OpenAI(apiKey, {
    max_tokens: 2000,
  });

  const prompt = ExtractCSVPrompt;

  // Load the file
  const filepath = "./data/bens-bites-email.txt";
  let doc = fs.readFileSync(filepath, "utf8");

  // Split the doc by the separator
  const separator = "\n";
  const texts = doc.split(separator);

  const chunkSize = 1000;
  const chunkOverlap = 0;

  // Create chunks to send to the model
  const chunks = texts.reduce((chunks: string[], text) => {
    let chunk = chunks.pop() || "";
    const chunkLength = openai.countTokens(chunk);
    if (chunkLength >= chunkSize + chunkOverlap) {
      chunks.push(chunk);
      chunk = "";
    }
    chunk = chunk === "" ? text : chunk + separator + text;
    chunks.push(chunk);
    return chunks;
  }, []);

  const headers = ["link", "title", "tldr", "category"];

  const csvs = await Promise.all(
    chunks.map((chunk) => {
      return openai.generate(prompt, {
        data: chunk,
        headers: headers.join(","),
      });
    })
  );

  // combine the chunked csvs into one csv
  const csv = headers.join(",") + "\n" + csvs.map((csv) => csv.trim()).join("");

  fs.writeFileSync("out.csv", csv);
}
